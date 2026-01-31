"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
	useState,
	useRef,
	useEffect,
	useCallback,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Send,
	Loader2,
	MessageCircle,
	X,
	Maximize2,
	Minimize2,
} from "lucide-react";
import { Messages } from "@/components/message";
import { pushGtmEvent, cn } from "@/lib/utils";

export default function ChatbotPopup() {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/chat",
		}),
		onError: (error) => {
			console.error("Chat error:", error);
			setError("Failed to send message. Please try again.");
		},
	});
	const [input, setInput] = useState("");

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

	// Trigger visibility after 10 seconds or scroll
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

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>,
	) {
		e.preventDefault();
		if (!input.trim()) return;

		setError(null); // Clear any previous errors

		pushGtmEvent({
			event: "chatbot_popup_send",
			category: "Chat",
			action: "Send Message",
			label: "Popup Chat",
		});

		try {
			sendMessage({ text: input });
			setInput("");
		} catch (err) {
			setError("Failed to send message. Please try again.");
			console.error("Error sending message:", err);
		}
	}

	const isLoading = status !== "ready";

	if (!isVisible) return null;

	return (
		<div
			className={cn(
				"fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end transition-all duration-500 ease-in-out",
				isOpen
					? "w-[calc(100vw-2rem)] md:w-[400px]"
					: "w-14 h-14 md:w-16 md:h-16",
			)}
		>
			{/* Chat Window */}
			<div
				className={cn(
					"bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 origin-bottom-right flex flex-col",
					isOpen
						? "h-[500px] opacity-100 scale-100 mb-4"
						: "h-0 opacity-0 scale-95 pointer-events-none mb-0",
					isExpanded && "md:w-[600px] h-[700px]",
				)}
			>
				{/* Header */}
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

				{/* Messages area */}
				<div className='flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar bg-gray-50/50 dark:bg-gray-900/50'>
					{error && (
						<div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-4'>
							<div className='flex items-start gap-2'>
								<span className='text-red-600 dark:text-red-400 text-xs font-semibold'>
									⚠️ Error
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
					{messages.length === 0 ? (
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
									onClick={() =>
										sendMessage({
											text: "What are Tushar's top skills?",
										})
									}
									className='text-[10px] font-bold p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left truncate'
								>
									🛠️ Top skills?
								</button>
								<button
									onClick={() =>
										sendMessage({
											text: "Tell me about his recent projects.",
										})
									}
									className='text-[10px] font-bold p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left truncate'
								>
									🚀 Recent projects?
								</button>
							</div>
						</div>
					) : (
						<Messages messages={messages} />
					)}
					<div ref={messagesEndRef} />
				</div>

				{/* Input area */}
				<div className='p-4 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800'>
					<form
						onSubmit={handleSubmit}
						className='flex gap-2'
					>
						<Input
							value={input}
							onChange={(e) => setInput(e.target.value)}
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

			{/* Toggle Button */}
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
