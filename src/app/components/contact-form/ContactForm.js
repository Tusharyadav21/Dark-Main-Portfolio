"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import styles from "./contact-form.module.css";

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
			<input type='text' name='user_name' placeholder='Name' />
			{/* <label>Email</label> */}
			<input type='email' name='user_email' placeholder='Email' />
			{/* <label>Message</label> */}
			<textarea name='message' placeholder='Message...' />
			{Message && <label>{Message}</label>}
			{!submitingData ? (
				<button type='submit' className={styles.contact_form_button}>
					Submit
				</button>
			) : (
				<button type='submit' className={styles.contact_form_button_submitting}>
					Submitting...
				</button>
			)}
		</form>
	);
};
