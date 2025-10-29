"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { contactInfo, socialLinks } from "@/data";
import Link from "next/link";
import { pushGtmEvent } from "@/lib/utils";
// import {
// 	Alert,
// 	AlertDescription,
// } from "@/components/ui/alert";

// Form validation schema
const contactFormSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	subject: z
		.string()
		.min(5, "Subject must be at least 5 characters"),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	const onSubmit = async (values: ContactFormValues) => {
		setIsSubmitting(true);
		setSubmitStatus({ type: null, message: "" });

		pushGtmEvent({
			event: "form_submission",
			category: "Contact",
			action: "Form Submitted",
			label: values.subject,
			submission_data: {
				name_present: !!values.name,
				message_length: values.message.length,
			},
		});

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				throw new Error("Failed to send message");
			}

			setSubmitStatus({
				type: "success",
				message:
					"Thank you! Your message has been sent successfully. I'll get back to you soon.",
			});
			form.reset();
		} catch (err) {
			setSubmitStatus({
				type: "error",
				message:
					"Oops! Something went wrong. Please try again later.",
			});
			console.log(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className='max-w-fit mx-auto'>
				{/* Header */}
				<div className='mb-16'>
					<h1 className='text-5xl md:text-6xl font-bold mb-4'>
						Let&apos;s Connect
					</h1>
					<div className='h-1 w-24 bg-linear-to-r from-blue-600 to-purple-600 mb-6' />
					<p className='text-lg  max-w-2xl '>
						Have a project in mind or want to discuss
						something? I&apos;d love to hear from you. Reach
						out through any of the channels below.
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<div className='lg:col-span-1 space-y-6'>
						<Card className='border-0 shadow-lg'>
							<CardHeader>
								<CardTitle className='text-xl'>
									Quick Contact
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								{contactInfo.map((info, idx) => {
									const Icon = info.icon;
									return (
										<div
											key={idx}
											className='flex items-start gap-4'
										>
											<div className='shrink-0 mt-1'>
												<Icon className='w-5 h-5 text-blue-600' />
											</div>
											<div>
												<p className='text-sm  font-medium'>
													{info.label}
												</p>
												{info.href ? (
													<Link
														href={info.href}
														className=' font-medium hover:text-blue-600 transition-colors'
													>
														{info.value}
													</Link>
												) : (
													<p className=' font-medium'>
														{info.value}
													</p>
												)}
											</div>
										</div>
									);
								})}
							</CardContent>
						</Card>

						{/* Social Links */}
						<Card className='border-0 shadow-lg'>
							<CardHeader>
								<CardTitle className='text-xl'>
									Follow Me
								</CardTitle>
								<CardDescription>
									Connect on social platforms
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-3'>
								{socialLinks.map((social) => {
									const Icon = social.icon;
									return (
										<Link
											key={social.name}
											href={social.url}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center justify-between p-3 rounded-lg transition-colors group'
										>
											<div className='flex items-center gap-3'>
												<Icon
													className={`w-5 h-5  ${social.color} transition-colors`}
												/>
												<span className='font-medium  group-hover:'>
													{social.name}
												</span>
											</div>
											<ExternalLink className='w-4 h-4  group-hover:' />
										</Link>
									);
								})}
							</CardContent>
						</Card>

						{/* Quick Reply Options */}
						<Card className='border-0 shadow-lg'>
							<CardHeader>
								<CardTitle className='text-lg'>
									Quick Reach Out
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-2'>
								<Link
									href='mailto:tushar@example.com?subject=Hello%20Tushar'
									className='block'
								>
									<Button
										variant='outline'
										className='w-full justify-start'
										gtmEvent={{
											event: "quick_reach_out",
											category: "Contact",
											action: "Send Email Click",
											label: "mailto link",
										}}
									>
										<Mail className='w-4 h-4 mr-2' />
										Send Email
									</Button>
								</Link>
								<Link
									href='https://calendly.com/tusharyadav21'
									target='_blank'
									rel='noopener noreferrer'
									className='block'
								>
									<Button
										variant='outline'
										className='w-full justify-start'
										gtmEvent={{
											event: "quick_reach_out",
											category: "Contact",
											action: "Schedule Call Click",
											label: "Calendly link",
										}}
									>
										📅 Schedule Call
									</Button>
								</Link>
							</CardContent>
						</Card>
					</div>

					{/* Right Column - Contact Form */}
					<div className='lg:col-span-2'>
						<Card className='border-0 shadow-lg'>
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
								{/* Status Alerts */}
								{/* {submitStatus.type === "success" && (
									<Alert className='mb-6 bg-green-50 border-green-200'>
										<CheckCircle className='h-4 w-4 text-green-600' />
										<AlertDescription className='text-green-800'>
											{submitStatus.message}
										</AlertDescription>
									</Alert>
								)}

								{submitStatus.type === "error" && (
									<Alert className='mb-6 bg-red-50 border-red-200'>
										<AlertCircle className='h-4 w-4 text-red-600' />
										<AlertDescription className='text-red-800'>
											{submitStatus.message}
										</AlertDescription>
									</Alert>
								)} */}

								{/* Form */}
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className='space-y-6'
									>
										{/* Name Field */}
										<FormField
											control={form.control}
											name='name'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Full Name</FormLabel>
													<FormControl>
														<Input
															placeholder='Your name'
															{...field}
															className='rounded-lg'
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* Email Field */}
										<FormField
											control={form.control}
											name='email'
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Email Address
													</FormLabel>
													<FormControl>
														<Input
															type='email'
															placeholder='your.email@example.com'
															{...field}
															className='rounded-lg'
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* Subject Field */}
										<FormField
											control={form.control}
											name='subject'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Subject</FormLabel>
													<FormControl>
														<Input
															placeholder='What is this about?'
															{...field}
															className='rounded-lg'
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* Message Field */}
										<FormField
											control={form.control}
											name='message'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Message</FormLabel>
													<FormControl>
														<Textarea
															placeholder='Your message here...'
															className='min-h-32 rounded-lg resize-none'
															{...field}
														/>
													</FormControl>
													<FormDescription>
														Maximum 500 characters
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* Submit Button */}
										<Button
											type='submit'
											disabled={isSubmitting}
											className='w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-base rounded-lg font-medium transition-all duration-300'
										>
											{isSubmitting ? (
												<>
													<Loader2 className='w-4 h-4 mr-2 animate-spin' />
													Sending...
												</>
											) : (
												<>
													<Mail className='w-4 h-4 mr-2' />
													Send Message
												</>
											)}
										</Button>
									</form>
								</Form>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* CTA Section */}
				<div className='mt-16'>
					<Card className='border-0 shadow-lg'>
						<CardContent className='pt-8 pb-8'>
							<h3 className='text-2xl font-bold mb-3'>
								Let&apos;s build something amazing together!
							</h3>
							<p className='mb-6'>
								Whether it&apos;s a full-stack project, AI
								integration, or just a quick chat, I&apos;m
								always open to collaborations.
							</p>
							<Button
								className='bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-lg'
								gtmEvent={{
									event: "cta_interaction",
									category: "Contact",
									action: "Start Project CTA",
									label: "Bottom CTA button",
								}}
							>
								Start a Project
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
