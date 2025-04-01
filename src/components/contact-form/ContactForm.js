"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import styles from "./contact-form.module.css";
import Button from "../motions/Button";

export const ContactForm = () => {
	const [submitingData, setSubmitingData] = useState(false);
	const [Message, setMessage] = useState(null);
	const form = useRef();

	const sendEmail = (e) => {
		setSubmitingData(true);
		e.preventDefault();

		console.log("Event send email", e);
		emailjs
			.sendForm(
				process.env.serviceKey,
				process.env.templateID,
				form.current,
				process.env.EmailJsAPIKey
			)
			.then(
				(result) => {
					setSubmitingData(false);
					setMessage("Message Sent.!");
				},
				(error) => {
					alert("Error sending email");
					setMessage("Message Sent.!");
					console.log(error.text);
				}
			);
	};

	return (
		<form ref={form} onSubmit={sendEmail} className={styles.contact_form}>
			{/* <label>Name</label> */}
			<input type='text' name='user_name' placeholder='Name' className="text-[var(--text)]" />
			{/* <label>Email</label> */}
			<input type='email' name='user_email' placeholder='Email' className="text-[var(--text)]" />
			{/* <label>Message</label> */}
			<textarea name='message' placeholder='Message...' className="text-[var(--text)]" />
			{Message && <label>{Message}</label>}
			{!submitingData ? (
				<Button type='submit' className="w-full">
					Submit
				</Button>
			) : (
				<Button type='submit' isDisabled={true} className={styles.contact_form_button_submitting}>
					Submitting...
				</Button>
			)}
		</form>
	);
};
