import dynamic from "next/dynamic";
import CTAButtons from "@/components/cta-buttons";
import { getPortfolioData } from "@/lib/portfolio";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

// Optimize by lazy loading non-critical sections
const CareerSection = dynamic(
	() => import("@/components/career-section"),
	{
		loading: () => (
			<div className='h-96 animate-pulse bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] mb-20' />
		),
		ssr: true,
	},
);

const ProjectsSection = dynamic(
	() => import("@/components/projects-section"),
	{
		loading: () => (
			<div className='h-96 animate-pulse bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] mb-20' />
		),
		ssr: true,
	},
);

const ContactSection = dynamic(
	() => import("@/components/contact-section"),
	{
		loading: () => (
			<div className='h-96 animate-pulse bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] mb-20' />
		),
		ssr: true,
	},
);

import ChatbotWrapper from "@/components/chatbot-wrapper";

// Markdown component overrides - extracted to prevent re-creation on each render
const markdownComponents: Components = {
	h2: ({ children, ...props }) => (
		<div className='mb-10 last:mb-0'>
			<h2
				className='text-3xl md:text-4xl font-black mt-0 mb-3 tracking-tight'
				{...props}
			>
				{children}
			</h2>
			<div className='h-1.5 w-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full' />
		</div>
	),
	p: ({ children, ...props }) => (
		<p
			className='text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8 last:mb-0 font-medium'
			{...props}
		>
			{children}
		</p>
	),
	strong: ({ children, ...props }) => (
		<strong
			className='font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1 rounded-md'
			{...props}
		>
			{children}
		</strong>
	),
	ul: ({ children, ...props }) => (
		<ul className='space-y-4 mb-10 list-none' {...props}>
			{children}
		</ul>
	),
	li: ({ children, ...props }) => (
		<li
			className='text-lg leading-relaxed text-gray-600 dark:text-gray-300 pl-0'
			{...props}
		>
			{children}
		</li>
	),
	blockquote: ({ children, ...props }) => (
		<blockquote
			className='border-l-4 border-blue-600 pl-6 py-4 my-8 italic text-xl text-gray-700 dark:text-gray-300 bg-blue-50/50 dark:bg-blue-900/10 rounded-r-lg'
			{...props}
		>
			{children}
		</blockquote>
	),
};
export default async function Home() {
	const portfolio = await getPortfolioData();

	return (
		<div className='max-w-4xl mx-auto w-full'>
			{/* Hero Section */}
			<section
				id='home'
				className='min-h-[60vh] flex flex-col justify-center pb-24 scroll-mt-24'
			>
				<div className='mb-12'>
					<h1 className='text-6xl md:text-8xl font-black mb-6 tracking-tight bg-linear-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent'>
						{portfolio.home.greeting}
					</h1>
					<div className='h-2 w-32 bg-linear-to-r from-blue-600 to-purple-600 mb-10 rounded-full shadow-lg shadow-blue-500/20' />
					<h2 className='text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 leading-tight mb-12'>
						{portfolio.home.subheading}
					</h2>
					<div className='flex justify-center md:justify-start'>
						<CTAButtons
							resumeLink={portfolio.profile.resumeLink}
						/>
					</div>
				</div>

				{/* Quick Stats Section In Hero */}
				<div className='mt-8 flex flex-wrap gap-8'>
					{portfolio.home.stats.map((stat) => (
						<div key={stat.label} className='flex flex-col'>
							<span className='text-2xl font-black text-blue-600 dark:text-blue-500'>
								{stat.value}
							</span>
							<span className='text-[10px] font-bold uppercase tracking-widest text-gray-400'>
								{stat.label}
							</span>
						</div>
					))}
				</div>
			</section>

			{/* About Section */}
			<section
				id='about'
				className='py-24 scroll-mt-24 relative'
			>
				{/* Decorative background elements */}
				<div className='absolute -top-24 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/15 transition-colors duration-700' />
				<div className='absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-colors duration-700' />

				<div className='relative prose dark:prose-invert max-w-none'>
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						components={markdownComponents}
					>
						{portfolio.content}
					</ReactMarkdown>
				</div>
			</section>

			{/* Feature Sections */}
			<div className='space-y-24'>
				<CareerSection portfolio={portfolio} />
				<ProjectsSection portfolio={portfolio} />
				<ContactSection portfolio={portfolio} />
			</div>

			{/* Global UI */}
			<ChatbotWrapper />
		</div>
	);
}
