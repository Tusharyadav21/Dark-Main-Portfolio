"use client";

import dynamic from "next/dynamic";

const ChatbotPopup = dynamic(
	() => import("@/components/chatbot-popup"),
	{ ssr: false },
);

export default function ChatbotWrapper() {
	return <ChatbotPopup />;
}
