"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { Messages } from "@/components/message";

export default function ChatPage() {
	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/chat",
		}),
	});
	const [input, setInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to bottom
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [messages]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!input.trim()) return;

		sendMessage({ text: input });
		setInput("");
	}

	const isLoading = status !== "ready";

	return (
		<>
			{/* Messages Area */}
			<div className='flex-1 overflow-y-auto w-full px-4 sm:px-6 lg:px-8 py-8'>
				<div className='max-w-4xl mx-auto w-full'>
					{messages.length === 0 ? (
						// Empty State
						<div className='flex flex-col items-center justify-center h-full min-h-[60vh] text-center'>
							<div className='space-y-6 mb-12'>
								<div className='w-20 h-20 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg'>
									<span className='text-4xl font-bold'>
										AI
									</span>
								</div>
								<div>
									<h2 className='text-3xl font-bold  mb-3'>
										Hello! How can I help?
									</h2>
									<p className='text-base  max-w-md mx-auto leading-relaxed'>
										Ask me anything and I&apos;ll do my best
										to help with the information I can
										access. I can answer questions, help
										with coding, and much more.
									</p>
								</div>
							</div>

							{/* Quick Start Suggestions */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl'>
								<Button
									onClick={() =>
										sendMessage({
											text: "Tell me about your capabilities",
										})
									}
									variant='outline'
									className='p-4 rounded-lg border-2 transition-all text-left font-medium h-auto justify-start'
								>
									💡 What can you do?
								</Button>
								<Button
									onClick={() =>
										sendMessage({
											text: "How do I build a web app?",
										})
									}
									variant='outline'
									className='p-4 rounded-lg border-2 transition-all text-left font-medium h-auto justify-start'
								>
									🚀 Build a web app
								</Button>
								<Button
									onClick={() =>
										sendMessage({
											text: "Help me debug this code",
										})
									}
									variant='outline'
									className='p-4 rounded-lg border-2 transition-all text-left font-medium h-auto justify-start'
								>
									🐛 Debug code
								</Button>
								<Button
									onClick={() =>
										sendMessage({
											text: "Show me a code example",
										})
									}
									variant='outline'
									className='p-4 rounded-lg border-2 transition-all text-left font-medium h-auto justify-start'
								>
									📝 Code examples
								</Button>
							</div>
						</div>
					) : (
						// Messages List
						<Messages messages={messages} />
					)}
					<div ref={messagesEndRef} />
				</div>
			</div>

			{/* Input Area */}
			<div className='sticky bottom-0'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					<form
						onSubmit={handleSubmit}
						className='space-y-4'
					>
						<div className='flex gap-3'>
							<Input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder='Type your message...'
								disabled={isLoading}
								className='flex-1 rounded-lg text-base py-6'
							/>
							<Button
								type='submit'
								disabled={isLoading || !input.trim()}
								className='bg-linear-to-r text-white from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg px-8 py-6 font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
							>
								{isLoading ? (
									<>
										<Loader2 className='h-5 w-5 animate-spin' />
										<span>Sending</span>
									</>
								) : (
									<>
										<Send className='h-5 w-5' />
										<span>Send</span>
									</>
								)}
							</Button>
						</div>

						{/* Loading Indicator */}
						{isLoading && (
							<div className='flex items-center gap-2 text-sm  animate-pulse'>
								<div className='flex gap-1'>
									<div className='w-2 h-2 bg-blue-600 rounded-full animate-bounce' />
									<div
										className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'
										style={{ animationDelay: "0.1s" }}
									/>
									<div
										className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'
										style={{ animationDelay: "0.2s" }}
									/>
								</div>
								<span>AI is thinking...</span>
							</div>
						)}
					</form>

					{/* Footer Hint */}
					<p className='text-xs text-center mt-4'>
						Press Enter to send • AI responses may take a
						few seconds
					</p>
				</div>
			</div>
		</>
	);
}
