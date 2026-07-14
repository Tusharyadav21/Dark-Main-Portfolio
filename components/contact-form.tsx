"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Loader2 } from "lucide-react";
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
import { pushGtmEvent } from "@/lib/utils";

const contactFormSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters"),
	email: z
		.string()
		.email({ message: "Invalid email address" }),
	subject: z
		.string()
		.min(5, "Subject must be at least 5 characters"),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
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
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
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

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Address</FormLabel>
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

				{submitStatus.message && (
					<div
						className={`p-4 rounded-lg text-sm ${
							submitStatus.type === "success"
								? "bg-green-50 text-green-800 border border-green-200"
								: "bg-red-50 text-red-800 border border-red-200"
						}`}
					>
						{submitStatus.message}
					</div>
				)}

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
	);
}
