import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
// import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";

const montserrat = Montserrat({
	weight: [
		"100",
		"200",
		"300",
		"400",
		"500",
		"600",
		"700",
		"800",
		"900",
	],
	subsets: ["latin"],
	display: "swap",
	fallback: ["Arial", "sans-serif"],
	variable: "--font-montserrat",
});
const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "Tushar's Portfolio ",
	description: "Create a Portfolio on Next.js",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		// <html lang='en' suppressHydrationWarning>
		<html lang='en'>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
            (function() {
                try {
					const theme = localStorage.getItem('theme') ||
						(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
					document.documentElement.className = theme;
				} catch (e) {
						console.error("Error setting theme:", e);
					}
				})();
            `,
					}}
				/>
			</head>
			<body
				className={`${poppins.className} ${montserrat.className} `}
			>
				<div>
					{/* <ThemeToggle className='fixed top-0 left-1' /> */}
					<NavBar />
				</div>
				<main className='container !mx-auto'>
					{children}
				</main>
				<Footer/>
			</body>
			{/* <GoogleAnalytics
				gaID={process.env.NEXT_PUBLIC_GA_ID}
			/> */}
		</html>
	);
}
