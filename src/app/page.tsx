import Intro from "../components/intro/Intro";
import About from "../components/about/About";
import Skills from "../components/skills/Skills";
import Projects from "../components/projects/Projects";
import Footer from "../components/footer/Footer";
import ScrollButton from "../components/scrollButton/ScrollButton";

export default function Home() {
	return (
		<>
			<Intro />
			<About />
			<Skills />
			{/* <Work /> */}
			{/* <Testimonials /> */}
			<Projects />
			<Footer />
			<ScrollButton />
		</>
	);
}
