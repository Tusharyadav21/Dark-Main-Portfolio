import HeroSection from "@/components/hero-section";

export default function Home() {
	return (
		<div className='flex-1 min-h-screen items-center justify-center font-sans w-100%'>
			<main className='flex h-full w-full flex-col items-center justify-start sm:items-start'>
				<HeroSection />
			</main>
		</div>
	);
}
