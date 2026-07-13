import { z } from "zod";
import {
	validatePassword,
	createSessionCookie,
	checkRateLimit,
	incrementAttempts,
	setAuthCookie,
} from "@/lib/auth";

const loginSchema = z.object({
	password: z.string().min(1).max(128),
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { password } = loginSchema.parse(body);

		const ip = request.headers.get("x-forwarded-for") ?? "unknown";

		// Check rate limit before validating password
		const rateLimit = await checkRateLimit(ip);
		if (!rateLimit.allowed) {
			// Still increment to keep state consistent
			await incrementAttempts(ip);
			return Response.json(
				{
					success: false,
					error: "Too many attempts. Try again in 1 minute.",
					remaining: 0,
				},
				{
					status: 429,
				},
			);
		}

		// Validate password
		if (!validatePassword(password)) {
			await incrementAttempts(ip);
			const remaining = rateLimit.remaining - 1;
			return Response.json(
				{
					success: false,
					error: "Invalid password",
					remaining,
				},
				{
					status: 401,
				},
			);
		}

		// Success — create session cookie
		const cookieValue = await createSessionCookie();

		return Response.json(
			{ success: true },
			{
				status: 200,
				headers: {
					"Set-Cookie": setAuthCookie(cookieValue),
				},
			},
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return Response.json(
				{ success: false, error: "Invalid input" },
				{ status: 400 },
			);
		}
		return Response.json(
			{ success: false, error: "Internal server error" },
			{ status: 500 },
		);
	}
}
