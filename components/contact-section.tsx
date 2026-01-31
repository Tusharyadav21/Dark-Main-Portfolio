import React from "react";
import { ExternalLink } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PortfolioData } from "@/lib/portfolio";
import Link from "next/link";
import { DynamicIcon } from "@/components/icon-mapper";
import { ContactForm } from "@/components/contact-form";

export default function ContactSection({
	portfolio,
}: {
	readonly portfolio: PortfolioData;
}) {
	return (
		<section
			id='contact'
			className='max-w-4xl mx-auto py-24 scroll-mt-24'
		>
			{/* Header */}
			<div className='mb-12'>
				<h2 className='text-5xl md:text-6xl font-bold mb-4'>
					Let&apos;s Connect
				</h2>
				<div className='h-1 w-24 bg-linear-to-r from-blue-600 to-purple-600 mb-6' />
				<p className='text-lg max-w-2xl text-gray-600 dark:text-gray-400'>
					Have a project in mind or want to discuss
					something? I&apos;d love to hear from you. Reach
					out through any of the channels below.
				</p>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-1 space-y-6'>
					<Card className='border-0 shadow-lg bg-white dark:bg-gray-900 rounded-3xl'>
						<CardHeader>
							<CardTitle className='text-xl'>
								Quick Contact
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							{portfolio.contactInfo.map((info) => (
								<div
									key={info.label}
									className='flex items-start gap-4'
								>
									<div className='shrink-0 mt-1'>
										<DynamicIcon
											name={info.icon}
											className='w-5 h-5 text-blue-600'
										/>
									</div>
									<div>
										<p className='text-xs font-bold uppercase tracking-wider text-gray-400 mb-1'>
											{info.label}
										</p>
										{info.href ? (
											<Link
												href={info.href}
												className='font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors'
											>
												{info.value}
											</Link>
										) : (
											<p className='font-bold text-gray-900 dark:text-white'>
												{info.value}
											</p>
										)}
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Social Links */}
					<Card className='border-0 shadow-lg bg-white dark:bg-gray-900 rounded-3xl'>
						<CardHeader>
							<CardTitle className='text-xl'>
								Follow Me
							</CardTitle>
							<CardDescription>
								Connect on social platforms
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-3'>
							{portfolio.socialLinks.map((social) => (
								<Link
									key={social.name}
									href={social.url}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group'
								>
									<div className='flex items-center gap-3'>
										<DynamicIcon
											name={social.icon}
											className={`w-5 h-5 ${social.color} transition-colors`}
										/>
										<span className='font-bold text-gray-900 dark:text-white'>
											{social.name}
										</span>
									</div>
									<ExternalLink className='w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors' />
								</Link>
							))}
						</CardContent>
					</Card>
				</div>

				{/* Right Column - Contact Form */}
				<div className='lg:col-span-2'>
					<Card className='border-0 shadow-xl bg-white dark:bg-gray-900 rounded-3xl'>
						<CardHeader>
							<CardTitle className='text-2xl'>
								Send Me a Message
							</CardTitle>
							<CardDescription>
								Fill out the form below and I&apos;ll get
								back to you as soon as possible.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ContactForm />
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
