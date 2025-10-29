"use client";

import React from "react";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data";
import Image from "next/image";

export default function Projects() {
	return (
		<section className='max-w-4xl mx-auto w-full'>
			{/* Header Section */}
			<div className='mb-12'>
				<h2 className='text-4xl md:text-5xl font-bold mb-3'>
					Latest Projects
				</h2>
				<div className='h-1 w-20 bg-linear-to-r from-blue-600 to-purple-600 mb-6' />

				<div className='max-w-2xl '>
					<p className='text-base mb-5'>
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
								<Github className='w-4 h-4' />
								View All Projects
							</>
						</Button>
					</Link>
				</div>
			</div>

			{/* Grid Container */}
			<div className='grid justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
				{projects.map((project) => (
					<div
						key={project.id}
						className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group h-full flex flex-col'
					>
						{/* Image Container */}
						<div className='relative h-40 overflow-hidden bg-linear-to-br from-blue-500 to-purple-600'>
							<Image
								src={project.image}
								alt={`Screenshot of ${project.title} application interface`}
								fill
								className='object-cover group-hover:scale-110 transition-transform duration-300'
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							/>
							<div className='absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300' />
						</div>

						{/* Content Container */}
						<div className='p-4 flex flex-col flex-1'>
							{/* Title */}
							<h3 className='text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>
								{project.title}
							</h3>

							{/* Description */}
							<p className='text-gray-600 text-xs leading-relaxed mb-3 flex-1'>
								{project.description}
							</p>

							{/* Tags */}
							<div className='flex flex-wrap gap-1.5 mb-4'>
								{project.tags.map((tag) => (
									<span
										key={tag}
										className='px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full'
									>
										{tag}
									</span>
								))}
							</div>

							{/* Buttons */}
							<div className='flex gap-2'>
								<Link
									href={project.liveUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='flex-1'
								>
									<Button
										className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs py-1.5 flex items-center justify-center gap-1.5 transition-all duration-300'
										gtmEvent={{
											event: "project_interaction",
											category: "Portfolio",
											action: "View Demo",
											label: `Live Demo - ${project.title}`,
										}}
									>
										<>
											<ExternalLink className='w-3 h-3' />
											Demo
										</>
									</Button>
								</Link>
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
										className='w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-xs py-1.5 flex items-center justify-center gap-1.5 transition-all duration-300'
									>
										<>
											<Github className='w-3 h-3' />
											Code
										</>
									</Button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
