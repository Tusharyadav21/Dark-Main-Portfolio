import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { Resend } from "resend";
import { getPortfolioData, getContentBySlug } from "@/lib/portfolio";

let resend: Resend | null = null;

function getResend() {
	if (!resend) {
		resend = new Resend(process.env.RESEND_API_KEY);
	}
	return resend;
}

export const sendEmailTool = tool(
	async ({ name, contact, subject, message }) => {
		if (!name || !contact) {
			return JSON.stringify({
				success: false,
				error: "Sender name and contact information are required.",
				requiresInput: true,
				missingFields: [
					...(!name ? ["name"] : []),
					...(!contact ? ["contact"] : []),
				],
			});
		}

		try {
			const fromAddress =
				process.env.CONTACT_EMAIL || "onboarding@resend.dev";

			await getResend().emails.send({
				from: `Portfolio Chatbot <${fromAddress}>`,
				to: fromAddress,
				subject: subject || `Message from ${name} via Portfolio`,
				text: `Name: ${name}\nContact: ${contact}\n\n${message}`,
				replyTo: contact.includes("@") ? contact : undefined,
			});

			return JSON.stringify({
				success: true,
				message: `Email sent successfully from ${name}.`,
				senderName: name,
				senderContact: contact,
			});
		} catch {
			return JSON.stringify({
				success: false,
				error: "Failed to send email. Please try again later.",
			});
		}
	},
	{
		name: "sendEmail",
		description:
			"Send an email to Tushar on behalf of a visitor. Requires the sender's name, contact info (email or phone), and message. Always confirm with the user before sending.",
		schema: z.object({
			name: z
				.string()
				.describe("The sender's full name"),
			contact: z
				.string()
				.describe(
					"The sender's email address or phone number",
				),
			subject: z
				.string()
				.optional()
				.describe("Email subject line"),
			message: z
				.string()
				.describe("The message content to send"),
		}),
	},
);

export const getPortfolioInfoTool = tool(
	async ({ category, slug }) => {
		const portfolio = await getPortfolioData();

		const data: Record<string, unknown> = {};

		switch (category) {
			case "home":
				data.home = portfolio.home;
				data.profile = {
					name: portfolio.profile.name,
					role: portfolio.profile.role,
				};
				break;
			case "about":
				data.about = portfolio.content;
				data.profile = {
					name: portfolio.profile.name,
					role: portfolio.profile.role,
					location: portfolio.profile.location,
				};
				break;
			case "profile":
				data.profile = portfolio.profile;
				break;
			case "project":
				if (!slug) {
					return JSON.stringify({
						error: "Slug is required for project category. Use projects to list all.",
					});
				}
				const project = portfolio.projects.find(
					(p) => p.slug === slug,
				);
				if (!project) {
					return JSON.stringify({
						error: `Project not found: ${slug}`,
						available: portfolio.projects.map((p) => p.slug),
					});
				}
				data.project = project;
				break;
			case "projects":
				data.projects = portfolio.projects.map((p) => ({
					id: p.id,
					slug: p.slug,
					title: p.title,
					subtitle: p.subtitle,
					description: p.description,
					tags: p.tags,
					liveUrl: p.liveUrl,
					githubUrl: p.githubUrl,
					highlights: p.highlights,
					role: p.role,
					duration: p.duration,
				}));
				break;
			case "skills": {
				const skillsFile = await getContentBySlug("skills");
				data.skills = skillsFile.data.categories || [];
				break;
			}
			case "work":
				data.workExperience = portfolio.workExperience;
				break;
			case "education":
				data.education = portfolio.education;
				break;
			case "experience":
				data.workExperience = portfolio.workExperience;
				data.education = portfolio.education;
				break;
			case "contact":
				data.contactInfo = portfolio.contactInfo;
				data.socialLinks = portfolio.socialLinks;
				break;
			case "navigation":
				data.navigation = portfolio.navigation;
				break;
			case "achievements":
				data.achievements = portfolio.achievements;
				break;
			case "all":
				data.profile = portfolio.profile;
				data.home = portfolio.home;
				data.projects = portfolio.projects.map((p) => ({
					title: p.title,
					description: p.description,
					tags: p.tags,
				}));
				data.workExperience = portfolio.workExperience;
				data.education = portfolio.education;
				data.contactInfo = portfolio.contactInfo;
				data.socialLinks = portfolio.socialLinks;
				data.achievements = portfolio.achievements;
				data.navigation = portfolio.navigation;
				break;
			default:
				return JSON.stringify({
					error: `Unknown category: ${category}. Valid: home, about, profile, project, projects, skills, work, education, experience, contact, navigation, achievements, all`,
				});
		}

		return JSON.stringify(data);
	},
	{
		name: "getPortfolioInfo",
		description:
			"Retrieve structured portfolio data for rendering cards. Categories: home (greeting + stats), about (bio + role), profile (full contact details), project (single by slug), projects (all list), skills (grouped by category), work (job history), education, experience (work + education combined), contact (info + socials), navigation (site links), achievements, all (everything). For individual project details, use 'project' with a slug.",
		schema: z.object({
			category: z
				.enum([
					"home",
					"about",
					"profile",
					"project",
					"projects",
					"skills",
					"work",
					"education",
					"experience",
					"contact",
					"navigation",
					"achievements",
					"all",
				])
				.describe("The category of portfolio data to retrieve"),
			slug: z
				.string()
				.optional()
				.describe(
					"Project slug — required only when category is 'project'",
				),
		}),
	},
);

export const tools = [sendEmailTool, getPortfolioInfoTool];
