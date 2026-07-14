"use client";

import {
	Avatar,
	AvatarFallback,
} from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ToolCall {
	id: string;
	toolName: string;
	args: Record<string, unknown>;
	state: "call" | "result";
	result?: unknown;
}

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	toolCalls?: ToolCall[];
}

interface MessagesProps {
	messages: Message[];
	renderToolResult: (toolName: string, result: unknown) => React.ReactNode;
	ToolCallCard: React.ComponentType<{ toolName: string; args: Record<string, unknown> }>;
	isGenerating?: boolean;
	aiFact?: string;
}

export function Messages({ messages, renderToolResult, ToolCallCard, isGenerating, aiFact }: MessagesProps) {
	return (
		<div className='space-y-4 px-4 py-6'>
			{messages.map((message) => (
				<div
					key={message.id}
					className={`flex gap-1 animate-in fade-in slide-in-from-bottom-2 ${message.role === "user"
							? "flex-row-reverse"
							: ""
						}`}
				>
					<Avatar className='h-8 w-8 shrink-0 mt-1'>
						{message.role === "user" ? (
							<AvatarFallback className='bg-blue-500 text-white font-semibold'>
								U
							</AvatarFallback>
						) : (
							<AvatarFallback className='bg-linear-to-br from-purple-500 to-blue-500 text-white font-semibold'>
								AI
							</AvatarFallback>
						)}
					</Avatar>

					<div
						className={`flex flex-col gap-2 ${message.role === "user"
								? "items-end"
								: "items-start"
							}`}
					>
						<div
							className={`rounded-lg px-2 py-2 shadow-sm animate-in fade-in`}
						>
							<div>
								{message.content && (
									<div className='prose dark:prose-invert max-w-none antialiased prose-headings:mb-3 prose-headings:mt-4 first:prose-headings:mt-0 prose-ul:mt-2 prose-li:my-1.5 prose-p:text-[13px] prose-li:text-[13px] prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-[13px] prose-strong:text-[13px]'>
										<ReactMarkdown remarkPlugins={[remarkGfm]}>
											{message.content}
										</ReactMarkdown>
									</div>
								)}
								{!message.content && (!message.toolCalls || message.toolCalls.length === 0) && isGenerating && message.role === "assistant" && (
									<div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs italic py-1">
										<Loader2 className="w-3 h-3 animate-spin" />
										{aiFact || "Thinking..."}
									</div>
								)}
								{message.toolCalls?.map((toolCall) => {
									if (toolCall.state === "result" && toolCall.result) {
										return (
											<div key={toolCall.id}>
												{renderToolResult(toolCall.toolName, toolCall.result)}
											</div>
										);
									}
									return (
										<ToolCallCard
											key={toolCall.id}
											toolName={toolCall.toolName}
											args={toolCall.args}
										/>
									);
								})}
							</div>
						</div>
						<div className='flex items-center gap-1 px-1 text-xs text-gray-500'>
							<span>
								{new Date().toLocaleTimeString("en-US", {
									hour: "2-digit",
									minute: "2-digit",
									hour12: true,
								})}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
