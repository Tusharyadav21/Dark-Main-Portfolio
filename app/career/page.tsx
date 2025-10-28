"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
	educationData,
	TimelineItem,
	workData,
} from "@/data";

interface TimelineSectionProps {
	title: string;
	description: string;
	data: TimelineItem[];
	connector?: "at" | "from";
}

function TimelineSection({
	title,
	description,
	data,
	connector = "at",
}: TimelineSectionProps) {
	return (
		<div className='max-w-4xl mx-auto w-full'>
			<div className='mb-16'>
				<h2 className='text-4xl md:text-5xl font-bold  mb-3'>
					{title}
				</h2>
				<div className='h-1 w-20 bg-linear-to-r from-blue-600 to-purple-600 mb-6' />
				<p className='text-base  max-w-2xl'>
					{description}
				</p>
			</div>

			<div className='max-w-4xl mx-auto space-y-12'>
				{data.map((item, idx) => (
					<div key={idx} className='flex gap-8'>
						<div className='shrink-0 w-32'>
							<p className='text-sm font-medium  sticky top-16'>
								{item.years}
							</p>
						</div>

						<div className='flex-1 pb-12 border-b border-gray-200 last:border-b-0'>
							<div className='mb-4'>
								<div className='flex flex-wrap items-center gap-2'>
									<h3 className='text-xl font-semibold '>
										{item.title}
									</h3>
									<span className=' text-sm'>
										{connector}
									</span>
									{item.companyLink ? (
										<Link
											href={item.companyLink}
											target='_blank'
											rel='noopener noreferrer'
											className='text-xl font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors'
										>
											{item.company}
											<ExternalLink className='w-4 h-4' />
										</Link>
									) : (
										<span className='text-xl font-semibold '>
											{item.company}
										</span>
									)}
								</div>
							</div>

							<p className='text-sm  mb-3'>
								📍 {item.location}
							</p>

							{item.description &&
								item.description.map((text) => {
									return (
										<p
											key={text}
											className=' text-sm leading-relaxed'
										>
											{text}
										</p>
									);
								})}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default function Education() {
	return (
		<>
			<TimelineSection
				title='Work Experience'
				description="My professional journey and roles where I've contributed to various projects and organizations."
				data={workData}
				connector='at'
			/>

			<TimelineSection
				title='Education'
				description='My academic background and qualifications that shaped my technical expertise.'
				data={educationData}
				connector='from'
			/>
		</>
	);
}
