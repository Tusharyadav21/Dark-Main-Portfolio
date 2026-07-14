import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

declare global {
	interface Window {
		dataLayer?: Record<string, unknown>[];
	}
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export interface GtmEventData {
	event: string;
	category: string;
	action: string;
	label: string;
	prompt_length?: string;
	submission_data?: {
		name_present: boolean;
		message_length: number;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export const pushGtmEvent = (eventData: GtmEventData) => {
	if (
		eventData &&
		typeof window !== "undefined" &&
		window.dataLayer
	) {
		try {
			window.dataLayer.push(eventData);
		} catch (error) {
			console.error("GTM dataLayer push failed:", error);
		}
	}
};
