import {
	Mail,
	Phone,
	MapPin,
	ExternalLink,
	Home,
	BriefcaseBusiness,
	Frame,
	PhoneCall,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons/github-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";

export const IconMap: Record<string, React.ElementType> = {
	Mail,
	Phone,
	MapPin,
	Github: GitHubIcon,
	Linkedin: LinkedinIcon,
	ExternalLink,
	Home,
	BriefcaseBusiness,
	Frame,
	PhoneCall,
};

export function DynamicIcon({
	name,
	className,
}: {
	readonly name: string;
	readonly className?: string;
}) {
	const Icon = IconMap[name];
	if (!Icon) return null;
	return <Icon className={className} />;
}
