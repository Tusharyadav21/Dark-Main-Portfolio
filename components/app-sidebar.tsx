"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@radix-ui/react-avatar";
import {
	BriefcaseBusiness,
	Frame,
	Home,
	PhoneCall,
} from "lucide-react";
import ThemeToggle from "./theme-toggle";
import Link from "next/link";
import { GtmEventData } from "@/lib/utils";
import { pushGtmEvent } from "@/lib/utils";
import { useRouter } from "next/navigation";

type NavItem = {
	title: string;
	url: string;
	icon: React.ElementType | typeof AiAvatar;
	gtmEvent: GtmEventData;
};

export function AiAvatar() {
	return (
		<div className='flex'>
			<div className='w-6 h-6 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto'>
				<span className='text-white'>AI</span>
			</div>
		</div>
	);
}

const items: NavItem[] = [
	{
		title: "Home",
		url: "/",
		icon: Home,
		gtmEvent: {
			event: "navigation_click",
			category: "Sidebar",
			action: "Navigate",
			label: "Home",
		},
	},
	{
		title: "Work & Education",
		url: "/career",
		icon: BriefcaseBusiness,
		gtmEvent: {
			event: "navigation_click",
			category: "Sidebar",
			action: "Navigate",
			label: "Work & Education",
		},
	},
	{
		title: "Projects",
		url: "/projects",
		icon: Frame,
		gtmEvent: {
			event: "navigation_click",
			category: "Sidebar",
			action: "Navigate",
			label: "Projects",
		},
	},
	{
		title: "Let's Connect ",
		url: "/contact",
		icon: PhoneCall,
		gtmEvent: {
			event: "navigation_click",
			category: "Sidebar",
			action: "Navigate",
			label: "Let's Connect",
		},
	},
	{
		title: "Chat with my Assistant ",
		url: "/chat",
		icon: AiAvatar,
		gtmEvent: {
			event: "navigation_click",
			category: "Sidebar",
			action: "Navigate",
			label: "Chat with Assistant",
		},
	},
];

export function AppSidebar() {
	const router = useRouter();

	const handleNavigationClick = (item: NavItem) => {
		pushGtmEvent(item.gtmEvent);
		router.push(item.url);
	};

	return (
		<Sidebar>
			<SidebarHeader>
				<Avatar className='min-h-40 min-w-40'>
					<AvatarImage
						className='rounded-full w-40 h-40 m-auto mt-12'
						src='/portfolio_picture.png'
					/>
					<AvatarFallback className='rounded-full w-40 h-40 m-auto mt-12'>
						CN
					</AvatarFallback>
				</Avatar>
			</SidebarHeader>
			<SidebarContent className='text-center'>
				<SidebarGroup>
					<h1 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
						Tushar Yadav
					</h1>
					<SidebarGroupLabel className='justify-center text-md mb-4'>
						Software Engineer
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										onClick={() =>
											handleNavigationClick(item)
										}
									>
										<span className='pl-4 font-medium'>
											<item.icon />
											&nbsp;{item.title}
										</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className='max-w-full mx-auto'>
				<ThemeToggle
					gtmEvent={{
						event: "utility_click",
						category: "Sidebar",
						action: "Toggle Theme",
						label: "Theme Toggle",
					}}
				/>
			</SidebarFooter>
		</Sidebar>
	);
}
