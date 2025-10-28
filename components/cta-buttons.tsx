"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Download } from "lucide-react";

export default function CTAButtons() {
	return (
		<div className='flex flex-wrap gap-4 max-w-3xl'>
			{/* CTA Buttons */}
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
	);
}
