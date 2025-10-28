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

export function AiAvatar() {
	return (
		<div className='flex'>
			<div className='w-6 h-6 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto'>
				<span className='text-white'>AI</span>
			</div>
		</div>
	);
}

const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Work & Education",
		url: "/career",
		icon: BriefcaseBusiness,
	},
	{
		title: "Projects",
		url: "/projects",
		icon: Frame,
	},
	{
		title: "Let's Connect ",
		url: "/contact",
		icon: PhoneCall,
	},
	{
		title: "Chat with my Assistant ",
		url: "/chat",
		icon: AiAvatar,
	},
];

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<Avatar>
					<AvatarImage
						className='rounded-full w-46 h-46 m-auto mt-12'
						src='https://github.com/shadcn.png'
					/>
					<AvatarFallback className='rounded-full w-46 h-46 m-auto mt-12'>
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
										className='pl-4 font-medium'
									>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className='max-w-full mx-auto'>
				<ThemeToggle />
			</SidebarFooter>
		</Sidebar>
	);
}
