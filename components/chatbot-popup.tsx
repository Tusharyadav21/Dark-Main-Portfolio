"use client";

import { EmailConfirmCard, renderToolResult, ToolCallCard } from "@/components/chat-cards";
import { Messages } from "@/components/message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, pushGtmEvent } from "@/lib/utils";
import {
	Loader2,
	Maximize2,
	MessageCircle,
	Minimize2,
	Send,
	X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	toolCalls?: Array<{
		id: string;
		toolName: string;
		args: Record<string, unknown>;
		state: "call" | "result";
		result?: unknown;
	}>;
}

interface PendingEmail {
	name: string;
	contact: string;
	subject?: string;
	message: string;
}

const AI_FACTS = [
	"The term 'Artificial Intelligence' was coined at the Dartmouth Conference in 1956.",
	"Modern AI models learn patterns from billions of words instead of memorizing facts.",
	"A transformer model can process many words in parallel, making training much faster.",
	"AI-generated images start as random noise and gradually become recognizable pictures.",
	"Some AI models can understand text, images, audio, and video in a single system.",
	"Training a large AI model can take weeks or months using thousands of GPUs.",
	"Inference is the process of generating answers after a model has been trained.",
	"AI doesn't 'think' like humans—it predicts the most likely next token.",
	"A token is often shorter than a word; common words may be a single token.",
	"Context windows determine how much information an AI can remember during one conversation.",
	"Fine-tuning specializes a general AI model for specific tasks or industries.",
	"Retrieval-Augmented Generation (RAG) lets AI use external knowledge without retraining.",
	"Hallucinations occur when an AI confidently generates incorrect information.",
	"The first chatbot, ELIZA, was created in 1966 and simulated a psychotherapist.",
	"Deep learning became practical thanks to larger datasets, faster GPUs, and improved algorithms.",
	"AI-powered speech recognition can convert spoken language into text in real time.",
	"Diffusion models generate images by learning how to reverse a noise-adding process.",
	"Some coding AIs can explain, debug, and generate code in dozens of programming languages.",
	"A single high-end GPU can perform trillions of mathematical operations every second.",
	"Many AI accelerators are optimized specifically for matrix multiplication.",
	"The quality of a prompt can significantly influence an AI model's response.",
	"AI models can summarize books, analyze documents, and translate between hundreds of languages.",
	"Embeddings convert text into numerical vectors so AI can measure semantic similarity.",
	"Quantization reduces model size by storing weights with fewer bits while preserving performance.",
	"AI assistants can call tools like web search, calculators, or databases to improve answers.",
	"Many recommendation systems on streaming platforms and online stores are powered by AI.",
	"The same transformer architecture powers many modern chatbots, translators, and coding assistants.",
	"AI can detect patterns in data that are difficult for humans to notice.",
	"Edge AI runs directly on devices, reducing latency and improving privacy.",
	"Responsible AI development includes testing for bias, safety, and reliability.",
	"AI is transforming fields ranging from healthcare and education to finance and robotics."
];

export default function ChatbotPopup() {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [pendingEmail, setPendingEmail] = useState<PendingEmail | null>(null);
	const [isSendingEmail, setIsSendingEmail] = useState(false);
	const [factIndex, setFactIndex] = useState(0);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isLoading) {
			interval = setInterval(() => {
				setFactIndex((prev) => (prev + 1) % AI_FACTS.length);
			}, 3000);
		}
		return () => clearInterval(interval);
	}, [isLoading]);

	const handleScroll = useCallback(() => {
		const scrollPercent =
			(window.scrollY /
				(document.documentElement.scrollHeight -
					window.innerHeight)) *
			100;
		if (scrollPercent > 20) {
			setIsVisible(true);
		}
	}, []);

	useEffect(() => {
		const timer = setTimeout(
			() => setIsVisible(true),
			10000,
		);
		window.addEventListener("scroll", handleScroll);
		return () => {
			clearTimeout(timer);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	useEffect(() => {
		if (isOpen) {
			messagesEndRef.current?.scrollIntoView({
				behavior: "smooth",
			});
		}
	}, [messages, isOpen]);

	const parseSSEStream = useCallback(async (response: Response, assistantMessageId: string) => {
		const reader = response.body?.getReader();
		if (!reader) return;

		const decoder = new TextDecoder();
		let buffer = "";

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			buffer += decoder.decode(value, { stream: true });
			const lines = buffer.split("\n");
			buffer = lines.pop() || "";

			for (const line of lines) {
				if (line.startsWith("data: ")) {
					const data = line.slice(6);
					if (data === "[DONE]") {
						setIsLoading(false);
						return;
					}

					try {
						const parsed = JSON.parse(data);

						if (parsed.type === "text") {
							const text = parsed.text;

							const toolCallMatch = text.match(/\[TOOL_CALL\](.*?)\[\/TOOL_CALL\]/);
							if (toolCallMatch) {
								try {
									const toolCallData = JSON.parse(toolCallMatch[1]);
									setMessages((prev) =>
										prev.map((msg) =>
											msg.id === assistantMessageId
												? {
													...msg,
													toolCalls: [
														...(msg.toolCalls || []),
														{
															id: toolCallData.id,
															toolName: toolCallData.toolName,
															args: toolCallData.args,
															state: "call" as const,
														},
													],
												}
												: msg,
										),
									);
								} catch {
									setMessages((prev) =>
										prev.map((msg) =>
											msg.id === assistantMessageId
												? { ...msg, content: msg.content + text }
												: msg,
										),
									);
								}
							} else {
								setMessages((prev) =>
									prev.map((msg) =>
										msg.id === assistantMessageId
											? { ...msg, content: msg.content + text }
											: msg,
									),
								);
							}
						} else if (parsed.type === "tool_result") {
							setMessages((prev) =>
								prev.map((msg) =>
									msg.id === assistantMessageId
										? {
											...msg,
											toolCalls: (msg.toolCalls || []).map((tc) =>
												tc.id === parsed.id
													? { ...tc, state: "result" as const, result: parsed.result }
													: tc,
											),
										}
										: msg,
								),
							);

							if (parsed.toolName === "sendEmail") {
								try {
									const result = JSON.parse(parsed.result);
									if (result.requiresInput) {
										const toolCall = messages
											.find((m) => m.id === assistantMessageId)
											?.toolCalls?.find((tc) => tc.id === parsed.id);
										if (toolCall) {
											setPendingEmail(toolCall.args as unknown as PendingEmail);
										}
									}
								} catch { }
							}
						} else if (parsed.type === "error") {
							setError(parsed.error);
							setIsLoading(false);
						}
					} catch { }
				}
			}
		}
	}, [messages]);

	const sendMessage = useCallback(async (text: string) => {
		const userMessage: Message = {
			id: `user-${Date.now()}`,
			role: "user",
			content: text,
		};

		const assistantMessage: Message = {
			id: `assistant-${Date.now()}`,
			role: "assistant",
			content: "",
			toolCalls: [],
		};

		setMessages((prev) => [...prev, userMessage, assistantMessage]);
		setIsLoading(true);
		setError(null);

		try {
			const allMessages = [...messages, userMessage].map((m) => ({
				role: m.role,
				content: m.content,
			}));

			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: allMessages }),
			});

			if (!response.ok) {
				throw new Error("Failed to send message");
			}

			await parseSSEStream(response, assistantMessage.id);
		} catch {
			setError("Failed to send message. Please try again.");
			setIsLoading(false);
			setMessages((prev) =>
				prev.filter((m) => m.id !== assistantMessage.id),
			);
		}
	}, [messages, parseSSEStream]);

	const handleConfirmEmail = useCallback(async () => {
		if (!pendingEmail) return;

		setIsSendingEmail(true);
		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					messages: [
						...messages.map((m) => ({
							role: m.role,
							content: m.content,
						})),
						{
							role: "user",
							content: `Yes, confirm and send the email from ${pendingEmail.name} (${pendingEmail.contact}): "${pendingEmail.message}"`,
						},
					],
				}),
			});

			if (!response.ok) throw new Error("Failed to send");

			const assistantMessage: Message = {
				id: `assistant-${Date.now()}`,
				role: "assistant",
				content: "",
				toolCalls: [],
			};
			setMessages((prev) => [...prev, assistantMessage]);
			await parseSSEStream(response, assistantMessage.id);
			setPendingEmail(null);
		} catch {
			setError("Failed to send email. Please try again.");
		} finally {
			setIsSendingEmail(false);
		}
	}, [pendingEmail, messages, parseSSEStream]);

	const handleCancelEmail = useCallback(() => {
		setPendingEmail(null);
		setMessages((prev) => [
			...prev,
			{
				id: `user-${Date.now()}`,
				role: "user",
				content: "No, cancel that.",
			},
		]);
	}, []);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		pushGtmEvent({
			event: "chatbot_popup_send",
			category: "Chat",
			action: "Send Message",
			label: "Popup Chat",
		});

		const text = input;
		setInput("");
		await sendMessage(text);
	}

	if (!isVisible) return null;

	return (
		<div
			className={cn(
				"fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end transition-all duration-500 ease-in-out"
			)}
		>
			<div
				className={cn(
					"bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 origin-bottom-right flex flex-col",
					isOpen
						? "w-[calc(100vw-2rem)] sm:w-[400px] h-[calc(100vh-8rem)] sm:h-[500px] opacity-100 scale-100 mb-4"
						: "w-0 h-0 opacity-0 scale-95 pointer-events-none mb-0",
					(isExpanded || isFocused) && isOpen && "sm:w-[600px] sm:h-[700px]",
				)}
			>
				<div className='p-4 bg-linear-to-r from-blue-600 to-purple-600 text-white flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-xs shadow-inner'>
							AI
						</div>
						<div>
							<h3 className='font-bold text-sm leading-none mb-1'>
								Portfolio Assistant
							</h3>
							<div className='flex items-center gap-1.5'>
								<div className='w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse' />
								<span className='text-[10px] opacity-80 uppercase tracking-widest font-bold'>
									Online
								</span>
							</div>
						</div>
					</div>
					<div className='flex items-center gap-1'>
						<button
							onClick={() => setIsExpanded(!isExpanded)}
							className='p-1.5 hover:bg-white/20 rounded-lg transition-colors hidden md:block'
						>
							{isExpanded ? (
								<Minimize2 size={16} />
							) : (
								<Maximize2 size={16} />
							)}
						</button>
						<button
							onClick={() => setIsOpen(false)}
							className='p-1.5 hover:bg-white/20 rounded-lg transition-colors'
						>
							<X size={18} />
						</button>
					</div>
				</div>

				<div className='flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-gray-50/50 dark:bg-gray-900/50'>
					{error && (
						<div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-4'>
							<div className='flex items-start gap-2'>
								<span className='text-red-600 dark:text-red-400 text-xs font-semibold'>
									Error
								</span>
								<p className='text-xs text-red-600 dark:text-red-400 flex-1'>
									{error}
								</p>
								<button
									onClick={() => setError(null)}
									className='text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200'
								>
									<X size={14} />
								</button>
							</div>
						</div>
					)}

					{messages.length === 0 && !pendingEmail ? (
						<div className='flex flex-col items-center justify-center h-full text-center p-6 space-y-4'>
							<div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-2'>
								<MessageCircle size={24} />
							</div>
							<h4 className='font-bold text-gray-900 dark:text-white'>
								How can I help you today?
							</h4>
							<p className='text-xs text-gray-500 dark:text-gray-400'>
								Ask about Tushar&apos;s experience, skills,
								or projects.
							</p>
							<div className='grid grid-cols-1 gap-2 w-full pt-2'>
								<button
									onClick={() => sendMessage("What are Tushar's top skills?")}
									className='text-[10px] font-bold p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left truncate'
								>
									Top skills?
								</button>
								<button
									onClick={() => sendMessage("Tell me about his recent projects.")}
									className='text-[10px] font-bold p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left truncate'
								>
									Recent projects?
								</button>
								<button
									onClick={() => sendMessage("How can I contact Tushar?")}
									className='text-[10px] font-bold p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left truncate'
								>
									Contact info?
								</button>
							</div>
						</div>
					) : (
						<Messages
							messages={messages}
							renderToolResult={renderToolResult}
							ToolCallCard={ToolCallCard}
							isGenerating={isLoading}
							aiFact={AI_FACTS[factIndex]}
						/>
					)}

					{pendingEmail && (
						<EmailConfirmCard
							emailData={pendingEmail}
							onConfirm={handleConfirmEmail}
							onCancel={handleCancelEmail}
							isSending={isSendingEmail}
						/>
					)}

					<div ref={messagesEndRef} />
				</div>

				<div className='p-4 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800'>
					<form
						onSubmit={handleSubmit}
						className='flex gap-2'
					>
						<Input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							placeholder='Type your message...'
							disabled={isLoading}
							className='rounded-xl bg-gray-50 dark:bg-gray-900 border-none shadow-inner h-10 text-sm'
						/>
						<Button
							type='submit'
							disabled={isLoading || !input.trim()}
							size='icon'
							className='rounded-xl bg-blue-600 hover:bg-blue-700 transition-all h-10 w-10 shrink-0 shadow-lg'
						>
							{isLoading ? (
								<Loader2 className='w-4 h-4 animate-spin text-white' />
							) : (
								<Send size={16} className='text-white' />
							)}
						</Button>
					</form>
				</div>
			</div>

			<button
				onClick={() => setIsOpen(!isOpen)}
				aria-label={isOpen ? "Close chat" : "Open chat"}
				className={cn(
					"w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95",
					isOpen
						? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 rotate-90"
						: "bg-linear-to-br from-blue-600 to-purple-600 text-white",
				)}
			>
				{isOpen ? (
					<X size={28} />
				) : (
					<MessageCircle size={28} />
				)}

				{!isOpen && (
					<span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white dark:border-gray-950 flex items-center justify-center'>
						<span className='w-2 h-2 bg-white rounded-full animate-ping' />
					</span>
				)}
			</button>
		</div>
	);
}
