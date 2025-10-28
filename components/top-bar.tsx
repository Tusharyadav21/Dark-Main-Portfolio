"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopBar() {
	return (
		<div className='md:hidden fixed top-4 left-4 z-50 flex justify-center items-center'>
			<SidebarTrigger /> <span>Menu</span>
		</div>
	);
}
