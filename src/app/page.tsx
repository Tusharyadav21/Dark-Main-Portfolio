import Intro from "../components/intro";
import About from "../components/about";
import Skills from "../components/skills";
import Projects from "../components/projects";
import Work from "../components/work";

export default function Home() {
	return (
		<>
			<Intro />
			<Skills />
			<Work />
			{/* <Testimonials /> */}
			<Projects />
		</>
	);
}
