import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PortfolioData {
	metadata: {
		title: string;
		titleTemplate: string;
		description: string;
		basePath: string;
		keywords: string[];
		openGraph: {
			title: string;
			description: string;
			image?: string;
		};
		twitter: {
			card: "summary" | "summary_large_image" | "app" | "player";
			title: string;
			image?: string;
		};
	};
	profile: {
		name: string;
		role: string;
		location: string;
		email: string;
		phone: string;
		linkedin: string;
		github: string;
		resumeLink: string;
	};
	navigation: Array<{
		title: string;
		url: string;
		icon: string;
	}>;
	home: {
		greeting: string;
		subheading: string;
		stats: {
			label: string;
			value: string;
		}[];
	};
	socialLinks: {
		name: string;
		url: string;
		icon: string;
		color?: string;
	}[];
	contactInfo: {
		label: string;
		value: string;
		href: string | null;
		icon: string;
	}[];
	workExperience: {
		company: string;
		role: string;
		years: string;
		location: string;
		companyLink?: string;
		description: string;
	}[];
	education: {
		institution: string;
		degree: string;
		years: string;
		location: string;
		description: string;
	}[];
	projects: {
		id: string;
		slug: string;
		title: string;
		subtitle?: string;
		description: string;
		image?: string;
		liveUrl?: string;
		githubUrl?: string;
		tags: string[];
		highlights?: string[];
		role?: string;
		duration?: string;
		teamSize?: string;
		architecture?: string;
		challenges?: string[];
		learnings?: string[];
		futureWork?: string[];
	}[];
	achievements?: {
		title: string;
		description: string;
		icon: string;
	}[];
	systemPrompts: {
		general: string;
		technical: string;
		taskManagement: string;
	};
	content: string;
}

export interface ContentFile {
	slug: string;
	data: Record<string, unknown>;
	content: string;
	raw: string;
}

// ---------------------------------------------------------------------------
// Content directory
// ---------------------------------------------------------------------------

const CONTENT_DIR = path.join(process.cwd(), "content");

async function readContentFile(slug: string): Promise<ContentFile> {
	const filePath = path.join(CONTENT_DIR, `${slug}.md`);
	const raw = await fs.readFile(filePath, "utf8");
	const { data, content } = matter(raw);
	return { slug, data: data as Record<string, unknown>, content, raw };
}

// All known content slugs (order matters for admin panel display)
export const CONTENT_SLUGS = [
	"metadata",
	"profile",
	"navigation",
	"home",
	"about",
	"contact",
	"work-experience",
	"education",
	"skills",
	"projects",
	"achievements",
	"system-prompts",
] as const;

export type ContentSlug = (typeof CONTENT_SLUGS)[number];

// ---------------------------------------------------------------------------
// Public helpers (used by admin panel API routes)
// ---------------------------------------------------------------------------

export async function getContentBySlug(slug: ContentSlug): Promise<ContentFile> {
	return readContentFile(slug);
}

export async function getAllContentFiles(): Promise<ContentFile[]> {
	return Promise.all(CONTENT_SLUGS.map(readContentFile));
}

export async function getContentRaw(slug: ContentSlug): Promise<string> {
	const filePath = path.join(CONTENT_DIR, `${slug}.md`);
	return fs.readFile(filePath, "utf8");
}

// ---------------------------------------------------------------------------
// Composed portfolio data (used by all public-facing components)
// ---------------------------------------------------------------------------

export async function getPortfolioData(): Promise<PortfolioData> {
	const metadata = await readContentFile("metadata");
	const profile = await readContentFile("profile");
	const navigation = await readContentFile("navigation");
	const home = await readContentFile("home");
	const about = await readContentFile("about");
	const contact = await readContentFile("contact");
	const workExperience = await readContentFile("work-experience");
	const education = await readContentFile("education");
	const projects = await readContentFile("projects");
	const achievements = await readContentFile("achievements");
	const systemPrompts = await readContentFile("system-prompts");

	return {
		metadata: metadata.data as PortfolioData["metadata"],
		profile: profile.data as PortfolioData["profile"],
		navigation: (
			(navigation.data.items ?? []) as Array<{
				title: string;
				url: string;
				icon: string;
			}>
		),
		home: home.data as PortfolioData["home"],
		contactInfo: (
			(contact.data.items ?? []) as PortfolioData["contactInfo"]
		),
		socialLinks: (contact.data.socialLinks ??
			[]) as PortfolioData["socialLinks"],
		workExperience: (
			(workExperience.data.entries ?? []) as PortfolioData["workExperience"]
		),
		education: (
			(education.data.entries ?? []) as PortfolioData["education"]
		),
		projects: (
			(projects.data.entries ?? []) as PortfolioData["projects"]
		),
		achievements: (
			(achievements.data.entries ?? []) as PortfolioData["achievements"]
		),
		systemPrompts: systemPrompts.data as PortfolioData["systemPrompts"],
		content: about.content,
	} as PortfolioData;
}
