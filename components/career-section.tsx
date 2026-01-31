import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PortfolioData } from "@/lib/portfolio";
import ReactMarkdown from "react-markdown";

interface TimelineItem {
	years: string;
	title: string;
	company: string;
	companyLink?: string;
	location: string;
	description: string;
}

interface TimelineSectionProps {
	readonly title: string;
	readonly description: string;
	readonly data: TimelineItem[];
	readonly connector?: "at" | "from";
}

function TimelineSection({
	title,
	description,
	data,
	connector = "at",
}: TimelineSectionProps) {
	return (
		<div className='max-w-4xl mx-auto w-full mb-24 last:mb-0'>
			<div className='mb-12'>
				<h2 className='text-4xl md:text-5xl font-bold  mb-3'>
					{title}
				</h2>
				<div className='h-1 w-20 bg-linear-to-r from-blue-600 to-purple-600 mb-6' />
				<p className='text-base  max-w-2xl text-gray-600'>
					{description}
				</p>
			</div>

			<div className='max-w-4xl mx-auto space-y-12'>
				{data.map((item) => (
					<div
						key={`${item.company}-${item.years}`}
						className='flex flex-col md:flex-row gap-4 md:gap-8'
					>
						<div className='shrink-0 w-full md:w-32'>
							<p className='text-sm font-bold text-blue-600'>
								{item.years}
							</p>
						</div>

						<div className='flex-1 pb-12 border-b border-gray-100 dark:border-gray-800 last:border-b-0'>
							<div className='mb-4'>
								<div className='flex flex-wrap items-center gap-2'>
									<h3 className='text-xl font-bold text-gray-900 dark:text-white leading-tight'>
										{item.title}
									</h3>
									<span className=' text-sm text-gray-500'>
										{connector}
									</span>
									{item.companyLink ? (
										<Link
											href={item.companyLink}
											target='_blank'
											rel='noopener noreferrer'
											className='text-xl font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors'
										>
											{item.company}
											<ExternalLink className='w-4 h-4' />
										</Link>
									) : (
										<span className='text-xl font-bold text-gray-900 dark:text-white'>
											{item.company}
										</span>
									)}
								</div>
							</div>

							<p className='text-sm text-gray-500 mb-4 flex items-center gap-1'>
								<span className='grayscale opacity-70'>
									📍
								</span>{" "}
								{item.location}
							</p>

							<div className='prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400'>
								<ReactMarkdown>
									{item.description}
								</ReactMarkdown>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default function CareerSection({
	portfolio,
}: {
	readonly portfolio: PortfolioData;
}) {
	return (
		<div id='career' className='scroll-mt-24 py-24'>
			<TimelineSection
				title='Work Experience'
				description="My professional journey and roles where I've contributed to various projects and organizations."
				data={portfolio.workExperience.map((exp) => ({
					...exp,
					title: exp.role,
				}))}
				connector='at'
			/>

			<TimelineSection
				title='Education'
				description='My academic background and qualifications that shaped my technical expertise.'
				data={portfolio.education.map((edu) => ({
					...edu,
					company: edu.institution,
					title: edu.degree,
				}))}
				connector='from'
			/>
		</div>
	);
}
