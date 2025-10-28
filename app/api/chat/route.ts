import { systemPrompts } from "@/data";
import { google } from "@ai-sdk/google";
import {
	streamText,
	UIMessage,
	convertToModelMessages,
} from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 120;

export async function POST(req: Request) {
	const {
		messages,
		assistantType,
	}: {
		messages: UIMessage[];
		assistantType?: keyof typeof systemPrompts;
	} = await req.json();

	const result = streamText({
		model: google("gemini-2.0-flash"),
		system: systemPrompts[assistantType || "general"],
		messages: convertToModelMessages(messages),
		maxOutputTokens: 512,
		temperature: 0.3,
		maxRetries: 5,
	});

	return result.toUIMessageStreamResponse();
}
