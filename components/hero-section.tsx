"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
	return (
		<div className='flex-1 min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center'>
			<div className='max-w-4xl mx-auto w-full'>
				{/* Main Greeting */}
				<div className='mb-16'>
					<h1 className='text-6xl md:text-7xl font-bold  mb-4 tracking-tight'>
						Hi, I&apos;m Tushar
					</h1>
					<div className='h-1 w-24 bg-linear-to-r from-blue-600 to-purple-600 mb-8' />
					<h2 className='text-3xl md:text-4xl font-semibold '>
						Full Stack Developer & Problem Solver
					</h2>
				</div>

				{/* About Sections */}
				<div className='space-y-12 mb-12'>
					{/* Foundation & Journey */}
					<div className='max-w-3xl'>
						<h3 className='text-2xl font-bold  mb-4'>
							Foundation & Journey
						</h3>
						<p className='text-base  leading-relaxed'>
							I&apos;m a dedicated MERN Stack Developer with
							a solid academic foundation in Mechanical
							Engineering from KIIT University, complemented
							by a minor in Computer Science. This unique
							blend of technical disciplines has equipped me
							with a distinctive perspective, fueling my
							passion for innovative problem-solving and
							effective application design.
						</p>
					</div>

					{/* Crafting Solutions */}
					<div className='max-w-3xl'>
						<h3 className='text-2xl font-bold  mb-4'>
							Crafting Innovative Web Solutions
						</h3>
						<p className='text-base  leading-relaxed'>
							Currently at Suventure Services, I specialize
							in developing robust full-stack web
							applications using ReactJS, Node.js, and
							JavaScript. I am committed to delivering
							scalable, high-performance solutions that
							drive measurable impact. My focus is on
							building applications that solve real-world
							problems with elegance and efficiency.
						</p>
					</div>
				</div>

				{/* CTA Buttons */}
				<div className='flex flex-wrap gap-4 max-w-3xl'>
					<Link href='/projects'>
						<Button className='bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-base rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2'>
							View My Work
							<ArrowRight className='w-5 h-5' />
						</Button>
					</Link>
					<Link href='/contact'>
						<Button
							variant='outline'
							className='border-2 border-gray-300  hover:bg-gray-50 px-8 py-6 text-base rounded-lg font-medium transition-all duration-300 flex items-center gap-2'
						>
							Get In Touch
							<ArrowRight className='w-5 h-5' />
						</Button>
					</Link>
					<a
						href='/resume.pdf'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Button
							variant='outline'
							className='border-2 border-gray-300  hover:bg-gray-50 px-8 py-6 text-base rounded-lg font-medium transition-all duration-300 flex items-center gap-2'
						>
							<Download className='w-5 h-5' />
							Download Resume
						</Button>
					</a>
				</div>

				{/* Optional: Stats Section */}
				<div className='mt-16 pt-16 border-t border-gray-200'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
						<div>
							<p className='text-3xl font-bold text-blue-600'>
								3+
							</p>
							<p className=' text-sm mt-1'>
								Years Experience
							</p>
						</div>
						<div>
							<p className='text-3xl font-bold text-blue-600'>
								10+
							</p>
							<p className=' text-sm mt-1'>
								Projects Completed
							</p>
						</div>
						<div>
							<p className='text-3xl font-bold text-blue-600'>
								5+
							</p>
							<p className=' text-sm mt-1'>Tech Stack</p>
						</div>
						<div>
							<p className='text-3xl font-bold text-blue-600'>
								100%
							</p>
							<p className=' text-sm mt-1'>Dedication</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
