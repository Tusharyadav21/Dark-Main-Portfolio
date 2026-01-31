import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioData } from "@/lib/portfolio";
import Image from "next/image";
import { GitHubIcon } from "@/components/icons/github-icon";

export default function ProjectsSection({
	portfolio,
}: {
	readonly portfolio: PortfolioData;
}) {
	return (
		<section
			id='projects'
			className='max-w-4xl mx-auto w-full py-24 scroll-mt-24'
		>
			{/* Header Section */}
			<div className='mb-12'>
				<h2 className='text-4xl md:text-5xl font-bold mb-3'>
					Latest Projects
				</h2>
				<div className='h-1 w-20 bg-linear-to-r from-blue-600 to-purple-600 mb-6' />

				<div className='max-w-2xl '>
					<p className='text-base mb-5 text-gray-600'>
						These are some of my recent projects. You can
						explore and interact with the live websites or
						check out the source code.
					</p>
					<Link
						href='https://github.com/Tusharyadav21?tab=repositories'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Button
							gtmEvent={{
								event: "cta_interaction",
								category: "Portfolio",
								action: "View All Projects CTA",
								label: "Top-of-Page Collection CTA",
							}}
							className='bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'
						>
							<>
								<GitHubIcon className='w-4 h-4' />
								View All Projects
							</>
						</Button>
					</Link>
				</div>
			</div>

			{/* Grid Container */}
			<div className='grid justify-center items-center grid-cols-1 md:grid-cols-2 gap-8'>
				{portfolio.projects.map((project) => (
					<div
						key={project.id}
						className='bg-white dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group h-full flex flex-col border border-gray-100 dark:border-gray-800'
					>
						{/* Image Container */}
						<div className='relative h-56 overflow-hidden bg-linear-to-br from-blue-500 to-purple-600'>
							{project.image ? (
								<Image
									src={project.image}
									alt={`Screenshot of ${project.title} application interface`}
									fill
									className='object-cover group-hover:scale-110 transition-transform duration-700 ease-out p-1 rounded-3xl'
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								/>
							) : (
								<div className='absolute inset-0 flex items-center justify-center'>
									<span className='text-6xl font-black text-white/30'>
										{project.title.charAt(0)}
									</span>
								</div>
							)}
							<div className='absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500' />
						</div>

						{/* Content Container */}
						<div className='p-6 flex flex-col flex-1'>
							{/* Title */}
							<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors'>
								{project.title}
							</h3>

							{/* Description */}
							<p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1'>
								{project.description}
							</p>

							{/* Tags */}
							<div className='flex flex-wrap gap-2 mb-8'>
								{project.tags.map((tag) => (
									<span
										key={tag}
										className='px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded-full'
									>
										{tag}
									</span>
								))}
							</div>

							{/* Buttons */}
							<div className='flex gap-3'>
								{project.liveUrl && (
									<Link
										href={project.liveUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='flex-1'
									>
										<Button
											className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs py-2.5 flex items-center justify-center gap-2 transition-all duration-300'
											gtmEvent={{
												event: "project_interaction",
												category: "Portfolio",
												action: "View Demo",
												label: `Live Demo - ${project.title}`,
											}}
										>
											<>
												<ExternalLink className='w-4 h-4' />
												Live Demo
											</>
										</Button>
									</Link>
								)}
								{project.githubUrl && (
									<Link
										href={project.githubUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='flex-1'
									>
										<Button
											variant='outline'
											gtmEvent={{
												event: "project_interaction",
												category: "Portfolio",
												action: "View Code",
												label: `GitHub Code - ${project.title}`,
											}}
											className='w-full border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl text-xs py-2.5 flex items-center justify-center gap-2 transition-all duration-300'
										>
											<>
												<GitHubIcon className='w-4 h-4' />
												Source
											</>
										</Button>
									</Link>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
