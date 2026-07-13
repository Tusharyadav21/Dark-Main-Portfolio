import { Resend } from "resend";
import { z } from "zod";

function getResend() {
	return new Resend(process.env.RESEND_API_KEY);
}

const contactSchema = z.object({
	name: z.string().min(2).max(100),
	email: z.string().email(),
	subject: z.string().min(5).max(200),
	message: z.string().min(10).max(1000),
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const validatedData = contactSchema.parse(body);

		const emailUser = process.env.EMAIL_USER;
		if (!emailUser) {
			throw new Error("EMAIL_USER not configured");
		}

		const sanitizedMessage = validatedData.message
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;");

		const resend = getResend();
		await resend.emails.send({
			from: "onboarding@resend.dev",
			to: emailUser,
			subject: `Portfolio Contact: ${validatedData.subject}`,
			html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Message:</strong> ${sanitizedMessage}</p>
      `,
		});

		return Response.json(
			{ success: true },
			{ status: 200 },
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return Response.json(
				{
					success: false,
					error: "Invalid input",
					details: error.issues,
				},
				{ status: 400 },
			);
		}

		return Response.json(
			{
				success: false,
				error: "Failed to send message",
			},
			{ status: 500 },
		);
	}
}
