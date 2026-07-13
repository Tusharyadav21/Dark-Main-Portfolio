import { z } from "zod";
import matter from "gray-matter";

// ---------------------------------------------------------------------------
// Per-slug Zod schemas (defines the EXACT expected frontmatter shape)
// ---------------------------------------------------------------------------

const metadataSchema = z.object({
	title: z.string().min(1),
	titleTemplate: z.string().min(1),
	description: z.string().min(1),
	basePath: z.string().url(),
	keywords: z.array(z.string()).min(1),
	openGraph: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		image: z.string().min(1).optional(),
	}),
	twitter: z.object({
		card: z.enum(["summary", "summary_large_image", "app", "player"]),
		title: z.string().min(1),
		image: z.string().min(1).optional(),
	}),
});

const profileSchema = z.object({
	name: z.string().min(1),
	role: z.string().min(1),
	location: z.string().min(1),
	email: z.string().email(),
	phone: z.string().min(1),
	linkedin: z.string().min(1),
	github: z.string().min(1),
	resumeLink: z.string().url(),
});

const navigationSchema = z.object({
	items: z
		.array(
			z.object({
				title: z.string().min(1),
				url: z.string().min(1),
				icon: z.string().min(1),
			}),
		)
		.min(1),
});

const homeSchema = z.object({
	greeting: z.string().min(1),
	subheading: z.string().min(1),
	stats: z
		.array(
			z.object({
				label: z.string().min(1),
				value: z.string().min(1),
			}),
		)
		.min(1),
});

const contactSchema = z.object({
	items: z
		.array(
			z.object({
				label: z.string().min(1),
				value: z.string().min(1),
				href: z.string().nullable(),
				icon: z.string().min(1),
			}),
		)
		.min(1),
	socialLinks: z
		.array(
			z.object({
				name: z.string().min(1),
				url: z.string().url(),
				icon: z.string().min(1),
				color: z.string().optional(),
			}),
		)
		.min(1),
});

const workExperienceSchema = z.object({
	entries: z
		.array(
			z.object({
				company: z.string().min(1),
				role: z.string().min(1),
				years: z.string().min(1),
				location: z.string().min(1),
				companyLink: z.string().url().optional(),
				description: z.string().min(1),
			}),
		)
		.min(1),
});

const educationSchema = z.object({
	entries: z
		.array(
			z.object({
				institution: z.string().min(1),
				degree: z.string().min(1),
				years: z.string().min(1),
				location: z.string().min(1),
				description: z.string().min(1),
			}),
		)
		.min(1),
});

const skillsSchema = z.object({
	categories: z
		.array(
			z.object({
				category: z.string().min(1),
				skills: z
					.array(
						z.object({
							name: z.string().min(1),
							icon: z.string().min(1),
						}),
					)
					.min(1),
			}),
		)
		.min(1),
});

const projectsSchema = z.object({
	entries: z
		.array(
			z.object({
				id: z.string().min(1),
				slug: z.string().min(1),
				title: z.string().min(1),
				subtitle: z.string().optional(),
				description: z.string().min(1),
				image: z.string().optional(),
				liveUrl: z.string().url().optional(),
				githubUrl: z.string().url().optional(),
				tags: z.array(z.string()).min(1),
				highlights: z.array(z.string()).optional(),
				role: z.string().optional(),
				duration: z.string().optional(),
				teamSize: z.string().optional(),
				architecture: z.string().optional(),
				challenges: z.array(z.string()).optional(),
				learnings: z.array(z.string()).optional(),
				futureWork: z.array(z.string()).optional(),
			}),
		)
		.min(1),
});

const achievementsSchema = z.object({
	entries: z
		.array(
			z.object({
				title: z.string().min(1),
				description: z.string().min(1),
				icon: z.string().min(1),
			}),
		)
		.min(1),
});

const systemPromptsSchema = z.object({
	general: z.string().min(1),
	technical: z.string().min(1),
	taskManagement: z.string().min(1),
});

// about.md and system-prompts.md have markdown bodies — validate frontmatter only
const aboutSchema = z.object({}).passthrough();

// ---------------------------------------------------------------------------
// Slug → schema map
// ---------------------------------------------------------------------------

export const CONTENT_SCHEMAS = {
	metadata: metadataSchema,
	profile: profileSchema,
	navigation: navigationSchema,
	home: homeSchema,
	about: aboutSchema,
	contact: contactSchema,
	"work-experience": workExperienceSchema,
	education: educationSchema,
	skills: skillsSchema,
	projects: projectsSchema,
	achievements: achievementsSchema,
	"system-prompts": systemPromptsSchema,
} as const;

export type ContentSlug = keyof typeof CONTENT_SCHEMAS;

export const CONTENT_SLUGS: ContentSlug[] = Object.keys(
	CONTENT_SCHEMAS,
) as ContentSlug[];

// ---------------------------------------------------------------------------
// Validation result
// ---------------------------------------------------------------------------

export interface ValidationError {
	path: string;
	message: string;
}

export interface ValidationResult {
	valid: boolean;
	errors: ValidationError[];
	slug: string;
}

// ---------------------------------------------------------------------------
// Validate a raw markdown file (frontmatter + optional body)
// ---------------------------------------------------------------------------

export function validateContent(
	slug: string,
	rawContent: string,
): ValidationResult {
	const schema = CONTENT_SCHEMAS[slug as ContentSlug];
	if (!schema) {
		return {
			valid: false,
			errors: [{ path: "slug", message: `Unknown slug: ${slug}` }],
			slug,
		};
	}

	try {
		const { data } = matter(rawContent);
		const result = schema.safeParse(data);

		if (result.success) {
			return { valid: true, errors: [], slug };
		}

		const errors: ValidationError[] = result.error.issues.map(
			(issue) => ({
				path: issue.path.join("."),
				message: issue.message,
			}),
		);

		return { valid: false, errors, slug };
	} catch (e) {
		return {
			valid: false,
			errors: [
				{
					path: "parse",
					message:
						e instanceof Error
							? e.message
							: "Failed to parse YAML frontmatter",
				},
			],
			slug,
		};
	}
}
