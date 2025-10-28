"use client";

import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from "@/components/ui/avatar";
import { CheckCheck } from "lucide-react";

import { UIMessage as AIMessage } from "ai";

interface MessagesProps {
	messages: AIMessage[];
}

export function Messages({ messages }: MessagesProps) {
	return (
		<div className='space-y-4 px-4 py-6'>
			{messages.map((message) => (
				<div
					key={message.id}
					className={`flex gap-1 animate-in fade-in slide-in-from-bottom-2 ${
						message.role === "user"
							? "flex-row-reverse"
							: ""
					}`}
				>
					{/* Avatar */}
					<Avatar className='h-8 w-8 shrink-0 mt-1'>
						{message.role === "user" ? (
							<>
								<AvatarImage
									src='https://github.com/shadcn.png'
									alt='User'
								/>
								<AvatarFallback className='bg-blue-500 text-white font-semibold'>
									U
								</AvatarFallback>
							</>
						) : (
							<>
								<AvatarImage src='' alt='AI' />
								<AvatarFallback className='bg-linear-to-br from-purple-500 to-blue-500 text-white font-semibold'>
									AI
								</AvatarFallback>
							</>
						)}
					</Avatar>

					{/* Message Content */}
					<div
						className={`flex flex-col gap-2 ${
							message.role === "user"
								? "items-end"
								: "items-start"
						}`}
					>
						{/* Message Bubble */}
						<div
							className={`rounded-lg px-2 pt-1.5 shadow-sm animate-in fade-in`}
						>
							<div className='whitespace-pre-wrap leading-relaxed'>
								{message.parts.map((part, i) => {
									switch (part.type) {
										case "text":
											return (
												<span
													key={`${message.id}-${i}`}
													className='text-sm'
												>
													{part.text}
												</span>
											);
										case "tool-invocation":
											return (
												<div
													key={`${message.id}-${i}`}
													className={`my-2 p-3 rounded-lg border ${
														message.role === "user"
															? "border-blue-400 bg-blue-500"
															: "border-gray-300 bg-gray-100"
													}`}
												>
													<p className='text-xs font-semibold opacity-75'>
														🔧 Tool Call
													</p>
													<p className='text-xs mt-1 opacity-90'>
														{part.type}
													</p>
												</div>
											);
										default:
											return null;
									}
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
