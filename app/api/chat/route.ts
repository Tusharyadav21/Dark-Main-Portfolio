import { tools } from "@/lib/chat-tools";
import { getPortfolioData } from "@/lib/portfolio";
import { AIMessage, AIMessageChunk, HumanMessage, SystemMessage, ToolMessage } from "@langchain/core/messages";
import { ChatGoogle } from "@langchain/google";

export const maxDuration = 120;

const model = new ChatGoogle({
	model: "gemini-3.1-flash-lite",
	maxOutputTokens: 2048,
	temperature: 0.7,
	apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
}).bindTools(tools);

interface ChatMessage {
	role: "user" | "assistant";
	content: string;
	toolInvocations?: Array<{
		id: string;
		toolName: string;
		args: Record<string, unknown>;
		state: "call" | "result";
		result?: unknown;
	}>;
}

function buildSystemPrompt(portfolio: Awaited<ReturnType<typeof getPortfolioData>>): string {
	const projectList = portfolio.projects
		.map(
			(p) =>
				`- ${p.title}${p.subtitle ? ` (${p.subtitle})` : ""}: ${p.description} [${p.tags.join(", ")}]${p.liveUrl ? ` | Live: ${p.liveUrl}` : ""}${p.githubUrl ? ` | GitHub: ${p.githubUrl}` : ""}`,
		)
		.join("\n");

	const skillCategories = portfolio.workExperience
		.map((w) => `${w.role} at ${w.company} (${w.years})`)
		.join("\n");

	return `You are Tushar Yadav's AI Portfolio Assistant. You answer questions about Tushar's skills, projects, experience, and background.

## Your Knowledge

**Profile:** ${portfolio.profile.name} — ${portfolio.profile.role}
Location: ${portfolio.profile.location}
GitHub: ${portfolio.profile.github}
LinkedIn: ${portfolio.profile.linkedin}
Email: ${portfolio.profile.email}

**Projects:**
${projectList}

**Work Experience:**
${skillCategories}

**Contact Info:**
${portfolio.contactInfo.map((c) => `${c.label}: ${c.value}`).join("\n")}

## Rules

1. ONLY answer questions about Tushar's portfolio, skills, projects, experience, or contact information.
2. If asked about something unrelated, respond: "I can only help with questions about Tushar's portfolio, skills, or experience. Feel free to ask about his projects, work history, or how to get in touch!"
3. Use the \`getPortfolioInfo\` tool when you need to show structured data (project cards, contact details, skills list, experience).
4. Use the \`sendEmail\` tool ONLY when a visitor explicitly wants to send a message to Tushar. ALWAYS confirm before sending by showing the email preview and asking for confirmation.
5. For the sendEmail tool, you MUST have the sender's name and contact info (email or phone). If missing, ask for them.
6. Be concise, professional, and helpful.
7. Never fabricate information. Only use data from the portfolio.`;
}

export async function POST(req: Request) {
	try {
		const portfolio = await getPortfolioData();
		const { messages }: { messages: ChatMessage[] } = await req.json();

		if (!messages || !Array.isArray(messages)) {
			return new Response(
				JSON.stringify({ error: "Invalid messages format" }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}

		const systemPrompt = buildSystemPrompt(portfolio);

		const langchainMessages = [
			new SystemMessage(systemPrompt),
			...messages.map((msg) => {
				if (msg.role === "user") {
					return new HumanMessage(msg.content);
				}
				return new AIMessage(msg.content);
			}),
		];

		const encoder = new TextEncoder();
		const stream = new ReadableStream({
			async start(controller) {
				try {
					let fullResponse: AIMessageChunk | null = null;
					const streamIterable = await model.stream(langchainMessages);
					for await (const chunk of streamIterable) {
						fullResponse = fullResponse ? fullResponse.concat(chunk) : chunk;
						if (chunk.content && typeof chunk.content === "string") {
							controller.enqueue(
								encoder.encode(`data: ${JSON.stringify({ type: "text", text: chunk.content })}\n\n`),
							);
						}
					}
					const response = fullResponse;

					if (response?.tool_calls && response.tool_calls.length > 0) {
						for (const toolCall of response.tool_calls) {
							const toolMessage = `[TOOL_CALL]${JSON.stringify({
								id: toolCall.id || toolCall.name,
								toolName: toolCall.name,
								args: toolCall.args,
							})}[/TOOL_CALL]`;

							controller.enqueue(
								encoder.encode(`data: ${JSON.stringify({ type: "text", text: toolMessage })}\n\n`),
							);
						}

						interface ToolCall {
							id?: string;
							name: string;
							args: Record<string, unknown>;
						}

						const toolResults = await Promise.all(
							response.tool_calls.map(async (toolCall: ToolCall) => {
								const toolToExecute = tools.find(
									(t) => t.name === toolCall.name,
								);
								if (!toolToExecute) {
									return {
										id: toolCall.id || toolCall.name,
										name: toolCall.name,
										result: `Tool ${toolCall.name} not found`,
									};
								}
								const result = await (toolToExecute as { invoke: (args: Record<string, unknown>) => Promise<string | unknown> }).invoke(toolCall.args);
								return {
									id: toolCall.id || toolCall.name,
									name: toolCall.name,
									result: typeof result === "string" ? result : JSON.stringify(result),
								};
							}),
						);

						for (const toolResult of toolResults) {
							controller.enqueue(
								encoder.encode(`data: ${JSON.stringify({
									type: "tool_result",
									id: toolResult.id,
									toolName: toolResult.name,
									result: toolResult.result,
								})}\n\n`),
							);
						}

						const followUpMessages = [
							new SystemMessage(systemPrompt),
							...messages.map((msg) => {
								if (msg.role === "user") {
									return new HumanMessage(msg.content);
								}
								return new AIMessage(msg.content);
							}),
							response,
							...toolResults.map(
								(tr) =>
									new ToolMessage({
										content: tr.result,
										tool_call_id: tr.id ?? "unknown",
									}),
							),
						];

						const followUpStream = await model.stream(followUpMessages);
						for await (const chunk of followUpStream) {
							if (chunk.content && typeof chunk.content === "string") {
								controller.enqueue(
									encoder.encode(`data: ${JSON.stringify({ type: "text", text: chunk.content })}\n\n`),
								);
							}
						}
					}

					controller.enqueue(encoder.encode("data: [DONE]\n\n"));
					controller.close();
				} catch (error) {
					console.error("Streaming error:", error);
					controller.enqueue(
						encoder.encode(
							`data: ${JSON.stringify({ type: "error", error: "Failed to generate response" })}\n\n`,
						),
					);
					controller.close();
				}
			},
		});

		return new Response(stream, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});
	} catch (error) {
		console.error("Chat API error:", error);
		return new Response(
			JSON.stringify({ error: "Failed to process chat request" }),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
}
