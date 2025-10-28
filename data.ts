import {
	Mail,
	Phone,
	MapPin,
	Github,
	Linkedin,
	Twitter,
	ExternalLink,
	Loader2,
} from "lucide-react";

export interface TimelineItem {
	years: string;
	title: string;
	company: string;
	companyLink?: string;
	location: string;
	description?: string[];
}

export const workData: TimelineItem[] = [
	{
		years: "2022 — Now",
		title: "Software Developer",
		company: "Suventure Services",
		companyLink: "https://suventure.in/",
		location: "Bengaluru, Karnataka, IN",
		description: [
			"Building full-stack applications and leading technical projects",
			"Led the end-to-end development of the Deccan Herald website using ReactJS, Node.js, Express, and EJS",
			"Enhancing performance and features for 10M+ monthly users.",
			"Improved Core Web Vitals by implementing advanced performance techniques such as lazy loading, code splitting, and image optimization, reducing load times by 30% for a high-traffic media site.",
			"Developed and presented 2+ POCs using Next.js, ReactJS, and NodeJS, showcasing potential applications of modern web frameworks in enterprise environments.",
			"Built a Node.js middleware POC integrating Razorpay with the Piano subscription platform using webhooks enabling secure, seamless payment flows and faster onboarding.",
		],
	},
];

export const educationData: TimelineItem[] = [
	{
		years: "2018 — 2022",
		title: "Bachelor's in Technology",
		company: "Kiit University",
		companyLink: "https://kiit.ac.in/",
		location: "Bhubaneswar, Odisha, IN",
		description: ["Computer Science & Engineering"],
	},
];

export const socialLinks = [
	{
		name: "GitHub",
		url: "https://github.com/Tusharyadav21",
		icon: Github,
		color: "hover:",
	},
	{
		name: "LinkedIn",
		url: "https://linkedin.com/in/tusharyadav21",
		icon: Linkedin,
		color: "hover:text-blue-600",
	},
];

export const contactInfo = [
	{
		icon: Mail,
		label: "Email",
		value: "tusharydv@hotmail.com",
		href: "mailto:tushar@example.com",
	},
	{
		icon: Phone,
		label: "Phone",
		value: "+91 8417941866",
		href: "tel:+918417941866",
	},
	{
		icon: MapPin,
		label: "Location",
		value: "Bengaluru, Karnataka, IN",
		href: null,
	},
];

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	liveUrl: string;
	githubUrl: string;
	tags: string[];
}

export const projects: Project[] = [
	{
		id: "1",
		title: "ToDo App",
		description:
			"A modern task management application with real-time updates and persistent storage.",
		image:
			"https://images.unsplash.com/photo-1540350394557-8d14fc246534?w=400&h=300&fit=crop",
		liveUrl: "https://react2do.netlify.app/",
		githubUrl: "https://github.com/Tusharyadav21/ToDo-App",
		tags: ["React", "Tailwind", "LocalStorage"],
	},
	{
		id: "2",
		title: "OMDB App",
		description:
			"Movie search application powered by the OMDB API with advanced filtering options.",
		image:
			"https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop",
		liveUrl: "https://omdb-api-task.netlify.app/",
		githubUrl:
			"https://github.com/Tusharyadav21/OMDB-API-App",
		tags: ["React", "API", "Axios"],
	},
	{
		id: "3",
		title: "Chat Application",
		description:
			"Real-time chat application with WebSocket support and typing indicators.",
		image:
			"https://images.unsplash.com/photo-1611746872915-64382b5b76e7?w=400&h=300&fit=crop",
		liveUrl: "https://github.com/Tusharyadav21",
		githubUrl: "https://github.com/Tusharyadav21",
		tags: ["Node.js", "Socket.io", "MongoDB"],
	},
	{
		id: "4",
		title: "E-Commerce Store",
		description:
			"Full-stack e-commerce platform with shopping cart and payment integration.",
		image:
			"https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
		liveUrl: "https://github.com/Tusharyadav21",
		githubUrl: "https://github.com/Tusharyadav21",
		tags: ["Next.js", "Stripe", "PostgreSQL"],
	},
];

export const systemPrompts = {
	general: `You are a professional support assistant for my projects.
Focus on helping me troubleshoot issues, provide technical guidance, and organize my tasks.
Be direct and concise. When I ask for code help, provide explanations with examples.
If something is outside your knowledge, suggest what resources or experts I should consult.`,
	technical: `You are my collaborative development partner.
We're building a full-stack web application together with RAG capabilities.
Be enthusiastic about technical challenges and help me think through architecture decisions.
When I ask about implementation details, provide practical code examples.
Point out potential issues before they become problems.`,
	taskManagement: `You are an efficient task management assistant.
Help me organize work, set priorities, and track progress on projects.
Be action-oriented and specific in recommendations.
When responding, structure information clearly with specific next steps.
Focus on what needs to be done and realistic timelines.`,
};
