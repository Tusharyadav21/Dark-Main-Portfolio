import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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
			image: string;
		};
		twitter: {
			card:
				| "summary"
				| "summary_large_image"
				| "app"
				| "player";
			title: string;
			image: string;
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
		title: string;
		description: string;
		image?: string;
		liveUrl?: string;
		githubUrl?: string;
		tags: string[];
	}[];
	systemPrompts: {
		general: string;
		technical: string;
		taskManagement: string;
	};
	content: string;
}

export function getPortfolioData(): PortfolioData {
	const filePath = path.join(
		process.cwd(),
		"content/portfolio.md",
	);
	const fileContent = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(fileContent);

	return {
		...(data as Omit<PortfolioData, "content">),
		content,
	} as PortfolioData;
}
