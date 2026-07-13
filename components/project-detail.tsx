import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle, Lightbulb, Target, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GitHubIcon } from "@/components/icons/github-icon";

interface Project {
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
}

export default function ProjectDetail({ project }: { readonly project: Project }) {
	return (
		<div className='max-w-4xl mx-auto w-full'>
			{/* Back Navigation */}
			<Link
				href='/#projects'
				className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8'
			>
				<ArrowLeft className='w-4 h-4' />
				Back to Projects
			</Link>

			{/* Hero Section */}
			<section className='mb-12'>
				<div className='flex flex-wrap items-start justify-between gap-4 mb-6'>
					<div>
						<h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-2'>
							{project.title}
						</h1>
						{project.subtitle && (
							<p className='text-xl text-muted-foreground'>
								{project.subtitle}
							</p>
						)}
					</div>
					<div className='flex gap-3'>
						{project.liveUrl && (
							<Link href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
								<Button className='bg-blue-600 hover:bg-blue-700 text-white'>
									<ExternalLink className='w-4 h-4 mr-2' />
									Live Demo
								</Button>
							</Link>
						)}
						{project.githubUrl && (
							<Link href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
								<Button variant='outline'>
									<GitHubIcon className='w-4 h-4 mr-2' />
									Source Code
								</Button>
							</Link>
						)}
					</div>
				</div>

				<p className='text-lg text-muted-foreground leading-relaxed mb-6'>
					{project.description}
				</p>

				{/* Meta Info */}
				<div className='flex flex-wrap gap-6 text-sm text-muted-foreground'>
					{project.role && (
						<div>
							<span className='font-medium text-foreground'>Role:</span>{" "}
							{project.role}
						</div>
					)}
					{project.duration && (
						<div>
							<span className='font-medium text-foreground'>Duration:</span>{" "}
							{project.duration}
						</div>
					)}
					{project.teamSize && (
						<div>
							<span className='font-medium text-foreground'>Team:</span>{" "}
							{project.teamSize}
						</div>
					)}
				</div>
			</section>

			<Separator className='my-8' />

			{/* Tech Stack */}
			<section className='mb-12'>
				<h2 className='text-2xl font-bold mb-4'>Tech Stack</h2>
				<div className='flex flex-wrap gap-2'>
					{project.tags.map((tag) => (
						<span
							key={tag}
							className='px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full'
						>
							{tag}
						</span>
					))}
				</div>
			</section>

			{/* Key Highlights */}
			{project.highlights && project.highlights.length > 0 && (
				<section className='mb-12'>
					<h2 className='text-2xl font-bold mb-4'>Key Highlights</h2>
					<div className='grid gap-3'>
						{project.highlights.map((highlight, index) => (
							<div key={index} className='flex items-start gap-3'>
								<CheckCircle className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
								<span className='text-muted-foreground'>{highlight}</span>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Architecture */}
			{project.architecture && (
				<section className='mb-12'>
					<h2 className='text-2xl font-bold mb-4'>Architecture</h2>
					<div className='prose dark:prose-invert max-w-none text-muted-foreground'>
						{project.architecture.split('\n\n').map((paragraph, index) => {
							if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('4.')) {
								const lines = paragraph.split('\n');
								return (
									<div key={index} className='mb-4'>
										{lines.map((line, lineIndex) => (
											<p key={lineIndex} className='mb-1' dangerouslySetInnerHTML={{ 
												__html: line
													.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
													.replace(/^(\d+\.\s)/, '<span class="font-mono text-blue-500">$1</span>')
											}} />
										))}
									</div>
								);
							}
							return <p key={index} className='mb-4'>{paragraph}</p>;
						})}
					</div>
				</section>
			)}

			{/* Challenges */}
			{project.challenges && project.challenges.length > 0 && (
				<section className='mb-12'>
					<h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
						<Target className='w-6 h-6 text-orange-500' />
						Challenges
					</h2>
					<ul className='space-y-3'>
						{project.challenges.map((challenge, index) => (
							<li key={index} className='flex items-start gap-3 text-muted-foreground'>
								<span className='font-mono text-orange-500 mt-0.5 shrink-0'>
									{String(index + 1).padStart(2, '0')}
								</span>
								{challenge}
							</li>
						))}
					</ul>
				</section>
			)}

			{/* Learnings */}
			{project.learnings && project.learnings.length > 0 && (
				<section className='mb-12'>
					<h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
						<Lightbulb className='w-6 h-6 text-yellow-500' />
						Key Learnings
					</h2>
					<ul className='space-y-3'>
						{project.learnings.map((learning, index) => (
							<li key={index} className='flex items-start gap-3 text-muted-foreground'>
								<CheckCircle className='w-4 h-4 text-green-500 mt-1 shrink-0' />
								{learning}
							</li>
						))}
					</ul>
				</section>
			)}

			{/* Future Work */}
			{project.futureWork && project.futureWork.length > 0 && (
				<section className='mb-12'>
					<h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
						<Rocket className='w-6 h-6 text-purple-500' />
						Future Work
					</h2>
					<ul className='space-y-3'>
						{project.futureWork.map((item, index) => (
							<li key={index} className='flex items-start gap-3 text-muted-foreground'>
								<span className='text-purple-500 mt-1 shrink-0'>→</span>
								{item}
							</li>
						))}
					</ul>
				</section>
			)}

			<Separator className='my-8' />

			{/* Bottom Navigation */}
			<div className='flex justify-between items-center'>
				<Link
					href='/#projects'
					className='text-sm text-muted-foreground hover:text-foreground transition-colors'
				>
					← Back to Projects
				</Link>
				<div className='flex gap-3'>
					{project.liveUrl && (
						<Link href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
							<Button variant='outline' size='sm'>
								<ExternalLink className='w-4 h-4 mr-2' />
								Live Demo
							</Button>
						</Link>
					)}
					{project.githubUrl && (
						<Link href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
							<Button variant='outline' size='sm'>
								<GitHubIcon className='w-4 h-4 mr-2' />
								Source
							</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
