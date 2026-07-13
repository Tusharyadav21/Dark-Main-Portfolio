import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioData } from "@/lib/portfolio";
import ProjectDetail from "@/components/project-detail";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
	const portfolio = await getPortfolioData();
	return portfolio.projects.map((project) => ({
		slug: project.slug,
	}));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const portfolio = await getPortfolioData();
	const project = portfolio.projects.find((p) => p.slug === slug);

	if (!project) {
		return { title: "Project Not Found" };
	}

	return {
		title: `${project.title} | Projects`,
		description: project.description,
		openGraph: {
			title: project.title,
			description: project.description,
			type: "article",
			...(project.image && { images: [project.image] }),
		},
	};
}

export default async function ProjectPage({ params }: PageProps) {
	const { slug } = await params;
	const portfolio = await getPortfolioData();
	const project = portfolio.projects.find((p) => p.slug === slug);

	if (!project) {
		notFound();
	}

	return <ProjectDetail project={project} />;
}
