"use client";

import Link from "next/link";
import { ExternalLink, Mail, Phone, MapPin, Briefcase, GraduationCap, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons/github-icon";

interface ProjectData {
	id?: string;
	slug?: string;
	title: string;
	subtitle?: string;
	description: string;
	tags?: string[];
	liveUrl?: string;
	githubUrl?: string;
	highlights?: string[];
	role?: string;
	duration?: string;
}

interface ContactData {
	label: string;
	value: string;
	href: string | null;
	icon: string;
}

interface SocialData {
	name: string;
	url: string;
	icon: string;
}

interface SkillCategory {
	category: string;
	skills: Array<{ name: string; icon: string }>;
}

interface ExperienceData {
	company: string;
	role: string;
	years: string;
	location: string;
	description: string;
}

interface EducationData {
	institution: string;
	degree: string;
	years: string;
	location: string;
	description: string;
}

export function ProjectCard({ project }: { project: ProjectData }) {
	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 shadow-sm my-2">
			<div className="flex items-start justify-between gap-2 mb-2">
				<h4 className="font-bold text-sm text-gray-900 dark:text-white">
					{project.title}
					{project.subtitle && (
						<span className="font-normal text-muted-foreground ml-1">
							— {project.subtitle}
						</span>
					)}
				</h4>
				{project.role && (
					<span className="text-[10px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full shrink-0">
						{project.role}
					</span>
				)}
			</div>
			<p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
				{project.description}
			</p>
			{project.tags && project.tags.length > 0 && (
				<div className="flex flex-wrap gap-1 mb-3">
					{project.tags.map((tag) => (
						<span
							key={tag}
							className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-medium rounded"
						>
							{tag}
						</span>
					))}
				</div>
			)}
			<div className="flex gap-2">
				{project.liveUrl && (
					<Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
						<Button size="sm" variant="outline" className="h-7 text-[10px]">
							<ExternalLink className="w-3 h-3 mr-1" />
							Live Demo
						</Button>
					</Link>
				)}
				{project.githubUrl && (
					<Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
						<Button size="sm" variant="outline" className="h-7 text-[10px]">
							<GitHubIcon className="w-3 h-3 mr-1" />
							Source
						</Button>
					</Link>
				)}
				{project.slug && (
					<Link href={`/projects/${project.slug}`}>
						<Button size="sm" variant="ghost" className="h-7 text-[10px]">
							Details →
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
}

export function ContactCard({ contacts, socials }: { contacts: ContactData[]; socials: SocialData[] }) {
	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 shadow-sm my-2">
			<h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
				Contact Information
			</h4>
			<div className="space-y-2">
				{contacts.map((c) => (
					<div key={c.label} className="flex items-center gap-2 text-xs">
						{c.icon === "mail" && <Mail className="w-3.5 h-3.5 text-gray-400" />}
						{c.icon === "phone" && <Phone className="w-3.5 h-3.5 text-gray-400" />}
						{c.icon === "map-pin" && <MapPin className="w-3.5 h-3.5 text-gray-400" />}
						<span className="text-gray-500 dark:text-gray-400">{c.label}:</span>
						{c.href ? (
							<a href={c.href} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
								{c.value}
							</a>
						) : (
							<span className="text-gray-900 dark:text-white">{c.value}</span>
						)}
					</div>
				))}
			</div>
			{socials.length > 0 && (
				<div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
					{socials.map((s) => (
						<Link key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
							<Button size="sm" variant="outline" className="h-7 text-[10px]">
								{s.name}
							</Button>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}

export function SkillsCard({ categories }: { categories: SkillCategory[] }) {
	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 shadow-sm my-2">
			<h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
				Skills
			</h4>
			<div className="space-y-3">
				{categories.map((cat) => (
					<div key={cat.category}>
						<p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
							{cat.category}
						</p>
						<div className="flex flex-wrap gap-1">
							{cat.skills.map((skill) => (
								<span
									key={skill.name}
									className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[10px] font-medium rounded"
								>
									{skill.name}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export function ExperienceCard({ work, education }: { work: ExperienceData[]; education: EducationData[] }) {
	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 shadow-sm my-2">
			<h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
				Experience & Education
			</h4>
			{work.length > 0 && (
				<div className="space-y-2 mb-3">
					{work.map((w) => (
						<div key={w.company} className="flex items-start gap-2">
							<Briefcase className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
							<div>
								<p className="text-xs font-medium text-gray-900 dark:text-white">
									{w.role} @ {w.company}
								</p>
								<p className="text-[10px] text-gray-500 dark:text-gray-400">
									{w.years} · {w.location}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
			{education.length > 0 && (
				<div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
					{education.map((e) => (
						<div key={e.institution} className="flex items-start gap-2">
							<GraduationCap className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
							<div>
								<p className="text-xs font-medium text-gray-900 dark:text-white">
									{e.degree} @ {e.institution}
								</p>
								<p className="text-[10px] text-gray-500 dark:text-gray-400">
									{e.years} · {e.location}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export function EmailConfirmCard({
	emailData,
	onConfirm,
	onCancel,
	isSending,
}: {
	emailData: { name: string; contact: string; subject?: string; message: string };
	onConfirm: () => void;
	onCancel: () => void;
	isSending: boolean;
}) {
	return (
		<div className="border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 bg-yellow-50 dark:bg-yellow-900/10 shadow-sm my-2">
			<div className="flex items-center gap-2 mb-3">
				<Mail className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
				<h4 className="font-bold text-sm text-yellow-800 dark:text-yellow-200">
					Confirm Email
				</h4>
			</div>
			<div className="space-y-2 text-xs mb-4">
				<div className="flex gap-2">
					<span className="text-gray-500 dark:text-gray-400 w-16">From:</span>
					<span className="text-gray-900 dark:text-white font-medium">{emailData.name}</span>
				</div>
				<div className="flex gap-2">
					<span className="text-gray-500 dark:text-gray-400 w-16">Contact:</span>
					<span className="text-gray-900 dark:text-white">{emailData.contact}</span>
				</div>
				{emailData.subject && (
					<div className="flex gap-2">
						<span className="text-gray-500 dark:text-gray-400 w-16">Subject:</span>
						<span className="text-gray-900 dark:text-white">{emailData.subject}</span>
					</div>
				)}
				<div className="flex gap-2">
					<span className="text-gray-500 dark:text-gray-400 w-16">Message:</span>
					<span className="text-gray-900 dark:text-white">{emailData.message}</span>
				</div>
			</div>
			<div className="flex gap-2">
				<Button
					size="sm"
					onClick={onConfirm}
					disabled={isSending}
					className="bg-green-600 hover:bg-green-700 text-white h-7 text-[10px]"
				>
					{isSending ? (
						"Sending..."
					) : (
						<>
							<Send className="w-3 h-3 mr-1" />
							Confirm & Send
						</>
					)}
				</Button>
				<Button
					size="sm"
					variant="outline"
					onClick={onCancel}
					disabled={isSending}
					className="h-7 text-[10px]"
				>
					Cancel
				</Button>
			</div>
		</div>
	);
}

export function ToolCallCard({ toolName }: { toolName: string; args: Record<string, unknown> }) {
	if (toolName === "getPortfolioInfo") {
		return null;
	}

	if (toolName === "sendEmail") {
		return null;
	}

	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800/50 my-1">
			<p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
				🔧 {toolName}
			</p>
		</div>
	);
}

export function renderToolResult(toolName: string, result: unknown) {
	try {
		const data = typeof result === "string" ? JSON.parse(result) : result;

		switch (toolName) {
			case "getPortfolioInfo": {
				const typedData = data as Record<string, unknown>;

				if (typedData.project) {
					return <ProjectCard project={typedData.project as ProjectData} />;
				}

				if (typedData.projects) {
					return (typedData.projects as ProjectData[]).map((p, i) => (
						<ProjectCard key={p.id || i} project={p} />
					));
				}

				if (typedData.contactInfo) {
					return (
						<ContactCard
							contacts={typedData.contactInfo as ContactData[]}
							socials={(typedData.socialLinks || []) as SocialData[]}
						/>
					);
				}

				if (typedData.skills) {
					return <SkillsCard categories={typedData.skills as SkillCategory[]} />;
				}

				if (typedData.workExperience) {
					return (
						<ExperienceCard
							work={typedData.workExperience as ExperienceData[]}
							education={(typedData.education || []) as EducationData[]}
						/>
					);
				}

				if (typedData.education && !typedData.workExperience) {
					return (
						<ExperienceCard
							work={[]}
							education={typedData.education as EducationData[]}
						/>
					);
				}

				if (typedData.home) {
					const homeData = typedData.home as { greeting: string; subheading: string; stats: Array<{ label: string; value: string }> };
					const profileData = typedData.profile as { name: string; role: string } | undefined;
					return (
						<div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 shadow-sm my-2">
							<h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
								{homeData.greeting}
							</h4>
							{profileData && (
								<p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
									{profileData.role}
								</p>
							)}
							<p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
								{homeData.subheading}
							</p>
							<div className="flex gap-4">
								{homeData.stats.map((stat) => (
									<div key={stat.label} className="text-center">
										<p className="text-lg font-bold text-blue-600 dark:text-blue-400">
											{stat.value}
										</p>
										<p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
											{stat.label}
										</p>
									</div>
								))}
							</div>
						</div>
					);
				}

				if (typedData.about) {
					const profileData = typedData.profile as { name: string; role: string; location: string } | undefined;
					return (
						<div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 shadow-sm my-2">
							{profileData && (
								<div className="mb-3">
									<h4 className="font-bold text-sm text-gray-900 dark:text-white">
										{profileData.name}
									</h4>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										{profileData.role} · {profileData.location}
									</p>
								</div>
							)}
							<p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-4">
								{typeof typedData.about === "string" ? typedData.about.slice(0, 300) + "..." : ""}
							</p>
						</div>
					);
				}

				if (typedData.navigation) {
					const navItems = typedData.navigation as Array<{ title: string; url: string }>;
					return (
						<div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 shadow-sm my-2">
							<h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
								Navigation
							</h4>
							<div className="flex flex-wrap gap-2">
								{navItems.map((item) => (
									<Link key={item.title} href={item.url}>
										<Button size="sm" variant="outline" className="h-7 text-[10px]">
											{item.title}
										</Button>
									</Link>
								))}
							</div>
						</div>
					);
				}

				return null;
			}
			case "sendEmail": {
				const typedData = data as { success?: boolean; error?: string; message?: string };
				if (typedData.success) {
					return (
						<div className="border border-green-200 dark:border-green-800 rounded-xl p-3 bg-green-50 dark:bg-green-900/10 my-2">
							<p className="text-xs text-green-700 dark:text-green-300">
								✓ {typedData.message}
							</p>
						</div>
					);
				}
				return null;
			}
			default:
				return null;
		}
	} catch {
		return null;
	}
}
