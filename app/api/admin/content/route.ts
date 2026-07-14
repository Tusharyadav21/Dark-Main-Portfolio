import {
	getAllContentFiles,
	CONTENT_SLUGS,
	type ContentSlug,
} from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const slug = searchParams.get("slug") as ContentSlug | null;

		// Single file
		if (slug) {
			if (!CONTENT_SLUGS.includes(slug)) {
				return Response.json(
					{ error: `Unknown slug: ${slug}` },
					{ status: 400 },
				);
			}
			const files = await getAllContentFiles();
			const file = files.find((f) => f.slug === slug);
			if (!file) {
				return Response.json(
					{ error: "File not found" },
					{ status: 404 },
				);
			}
			return Response.json({ slug: file.slug, raw: file.raw });
		}

		// All files (summary)
		const files = await getAllContentFiles();
		return Response.json({
			files: files.map((f) => ({
				slug: f.slug,
				raw: f.raw,
			})),
		});
	} catch (error) {
		console.error("Content read error:", error);
		return Response.json(
			{ error: "Failed to read content" },
			{ status: 500 },
		);
	}
}
