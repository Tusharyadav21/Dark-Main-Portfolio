import { z } from "zod";
import { Octokit } from "octokit";
import {
	validateContent,
	CONTENT_SLUGS,
	type ContentSlug,
} from "@/lib/content-schemas";

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const saveSchema = z.object({
	slug: z.string().refine((s) => CONTENT_SLUGS.includes(s as ContentSlug)),
	content: z.string().min(1).max(100_000),
	message: z.string().min(1).max(200).optional(),
});

// ---------------------------------------------------------------------------
// Octokit setup
// ---------------------------------------------------------------------------

function getOctokit(): Octokit {
	const token = process.env.GITHUB_TOKEN;
	if (!token) throw new Error("GITHUB_TOKEN not configured");
	return new Octokit({ auth: token });
}

function getRepoParts(): { owner: string; repo: string } {
	const repo = process.env.GITHUB_REPO;
	if (!repo) throw new Error("GITHUB_REPO not configured");
	const [owner, name] = repo.split("/");
	if (!owner || !name)
		throw new Error("GITHUB_REPO must be owner/repo");
	return { owner, repo: name };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function getFileSha(
	octokit: Octokit,
	owner: string,
	repo: string,
	path: string,
): Promise<string | null> {
	try {
		const { data } = await octokit.rest.repos.getContent({
			owner,
			repo,
			path,
		});
		if (!Array.isArray(data) && data.sha) {
			return data.sha;
		}
		return null;
	} catch {
		return null;
	}
}

// ---------------------------------------------------------------------------
// POST /api/admin/save
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { slug, content, message } = saveSchema.parse(body);

		// Validate content against schema before committing
		const validation = validateContent(slug, content);
		if (!validation.valid) {
			return Response.json(
				{
					success: false,
					error: "Content validation failed",
					details: validation.errors,
				},
				{ status: 400 },
			);
		}

		const octokit = getOctokit();
		const { owner, repo } = getRepoParts();

		const filePath = `content/${slug}.md`;

		// Get existing file SHA (needed for updates)
		const sha = await getFileSha(octokit, owner, repo, filePath);

		const commitMessage =
			message || `content: update ${slug} via admin panel`;

		await octokit.rest.repos.createOrUpdateFileContents({
			owner,
			repo,
			path: filePath,
			message: commitMessage,
			content: Buffer.from(content).toString("base64"),
			...(sha ? { sha } : {}),
		});

		return Response.json({
			success: true,
			file: filePath,
			commit: commitMessage,
		});
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

		console.error("Save error:", error);
		return Response.json(
			{
				success: false,
				error: "Failed to save content",
			},
			{ status: 500 },
		);
	}
}
