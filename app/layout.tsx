import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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

import { getPortfolioData } from "@/lib/portfolio";

const portfolio = getPortfolioData();

export const metadata: Metadata = {
	title: {
		default: portfolio.metadata.title,
		template: portfolio.metadata.titleTemplate,
	},
	metadataBase: new URL(portfolio.metadata.basePath),
	description: portfolio.metadata.description,
	keywords: portfolio.metadata.keywords,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: portfolio.metadata.basePath,
		title: portfolio.metadata.openGraph.title,
		description: portfolio.metadata.openGraph.description,
		images: [
			{
				url: portfolio.metadata.openGraph.image,
				width: 1024,
				height: 1024,
			},
		],
	},
	twitter: {
		card: portfolio.metadata.twitter.card,
		title: portfolio.metadata.twitter.title,
		images: [portfolio.metadata.twitter.image],
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
				<main className='flex-1 min-h-screen py-24 px-6 md:px-8'>
					{children}
				</main>
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
