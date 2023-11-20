import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/header/Header";
import Intro from "./components/intro/Intro";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Projects from "./components/projects/Projects";
import Footer from "./components/footer/Footer";
import ScrollButton from "./components/scrollButton/ScrollButton";

export default function Home() {
	return (
		<main className={styles.main}>
			<Header />
			<Intro />
			<About />
			<Skills />
			{/* <Work /> */}
			{/* <Testimonials /> */}
			<Projects />
			<Footer />
			<ScrollButton />
		</main>
	);
}
