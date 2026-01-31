import { getPortfolioData } from "@/lib/portfolio";
import { google } from "@ai-sdk/google";
import {
	streamText,
	UIMessage,
	convertToModelMessages,
} from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 120;

export async function POST(req: Request) {
	try {
		const portfolio = getPortfolioData();
		const {
			messages,
			assistantType,
		}: {
			messages: UIMessage[];
			assistantType?: keyof typeof portfolio.systemPrompts;
		} = await req.json();

		if (!messages || !Array.isArray(messages)) {
			return new Response(
				JSON.stringify({
					error: "Invalid messages format",
				}),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		const result = streamText({
			model: google("gemini-2.0-flash"),
			system:
				portfolio.systemPrompts[assistantType || "general"],
			messages: await convertToModelMessages(messages),
			maxOutputTokens: 512,
			temperature: 0.8,
			maxRetries: 1,
		});

		return result.toUIMessageStreamResponse();
	} catch (error) {
		console.error("Chat API error:", error);
		return new Response(
			JSON.stringify({
				error:
					"Failed to process chat request. Please try again.",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}
