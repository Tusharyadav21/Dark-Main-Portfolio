import "./App.css";
import About from "./components/about/About";
import Work from "./components/work/Work";
import Header from "./components/header/Header";
import Intro from "./components/intro/Intro";
import Services from "./components/services/Services";
import Testimonials from "./components/testimonials/Testimonials";
import News from "./components/news/News";
import Footer from "./components/footer/Footer";
import ScrollButton from "./components/scrollButton/ScrollButton";

function App() {
	return (
		<>
			<div>
				<Header />
				<Intro />
				<About />
				<Services />
				<Work />
				<Testimonials />
				<News />
				<Footer />
				<ScrollButton />
			</div>
		</>
	);
}

export default App;
