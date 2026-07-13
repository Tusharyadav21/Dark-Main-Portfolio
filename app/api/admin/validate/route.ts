import { z } from "zod";
import {
	validateContent,
	CONTENT_SLUGS,
	type ContentSlug,
} from "@/lib/content-schemas";

const validateSchema = z.object({
	slug: z
		.string()
		.refine((s): s is ContentSlug =>
			CONTENT_SLUGS.includes(s as ContentSlug),
		),
	content: z.string().min(1).max(100_000),
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { slug, content } = validateSchema.parse(body);

		const result = validateContent(slug, content);

		return Response.json(result);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return Response.json(
				{
					valid: false,
					errors: error.issues.map((i) => ({
						path: i.path.join("."),
						message: i.message,
					})),
					slug: "",
				},
				{ status: 400 },
			);
		}
		return Response.json(
			{
				valid: false,
				errors: [
					{ path: "server", message: "Validation failed" },
				],
				slug: "",
			},
			{ status: 500 },
		);
	}
}
