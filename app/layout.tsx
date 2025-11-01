import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import {
	GoogleAnalytics,
	GoogleTagManager,
} from "@next/third-parties/google";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	display: "swap",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default:
			"Tushar Yadav - Full Stack Developer & Problem Solver",
		template: "%s | Tushar Yadav",
	},
	metadataBase: new URL("https://dark-main.netlify.app"),
	description:
		"Full Stack Developer specializing in MERN stack, JavaScript and Python. Building scalable web applications with 3+ years of experience.",
	keywords: [
		"Full Stack Developer",
		"MERN Stack Developer",
		"ReactJS Developer",
		"Node.js Developer",
		"JavaScript Developer",
		"NextJs Developer",
		"Python Developer",
	],
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://tusharyadav.com",
		title: "Tushar Yadav - Full Stack Developer",
		description:
			"Full Stack Developer specializing in MERN stack with 3+ years of experience",
		images: [
			{
				url: "/portfolio_picture.png",
				width: 1024,
				height: 1024,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Tushar Yadav - Full Stack Developer",
		images: ["/portfolio_picture.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<SidebarProvider>
					<AppSidebar />
					<TopBar />
					<main className='flex-1 min-h-screen py-16 px-4 sm:px-6 lg:px-8'>
						{children}
					</main>
				</SidebarProvider>
			</body>
			<GoogleAnalytics
				gaId={process.env.NEXT_PUBLIC_GA_ID || ""}
			/>
			<GoogleTagManager
				gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""}
			/>
		</html>
	);
}
