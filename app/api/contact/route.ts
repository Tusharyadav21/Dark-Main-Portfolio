import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
	const { name, email, subject, message } =
		await request.json();

	const emailUser =
		process.env.EMAIL_USER || "default@email.com";

	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: emailUser,
		subject: `Email From Portfolio: ${subject}`,
		html: `<p>${name} (${email}) says: ${message}</p>`,
	});

	return new Response(JSON.stringify({ success: true }), {
		status: 200,
	});
}
