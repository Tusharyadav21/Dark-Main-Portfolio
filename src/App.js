import "./App.css";
import Header from "./components/header/Header";
import Intro from "./components/intro/Intro";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
// import Work from "./components/work/Work";
// import Testimonials from "./components/testimonials/Testimonials";
import Projects from "./components/projects/Projects";
import Footer from "./components/footer/Footer";
import ScrollButton from "./components/scrollButton/ScrollButton";

function App() {
	return (
		<>
			<div>
				<Header />
				<Intro />
				<About />
				<Skills />
				{/* <Work /> */}
				{/* <Testimonials /> */}
				<Projects />
				<Footer />
				<ScrollButton />
			</div>
		</>
	);
}

export default App;
