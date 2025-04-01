import React from "react";
import { AnimatedTextTyping } from "../motions/AnimateTextTyping";
import styles from "./about.module.css";

const About = () => {
	return (
		<div className={`bg-[var(--secondary)] containerd`} id='about'>
			<AnimatedTextTyping className="text-2xl"
				once el="h2" text="I am Tushar Yadav" gradient="bg-gradient-to-r from-[rgb(248,31,1)] to-[rgb(238,7,110)] bg-clip-text text-transparent text-4xl font-bold" />
			<h5 className="text-md font-extrabold text-[var(--background)]">A Full Stack Developer with 👌🏼 Javascript skills.</h5>
			<div className={styles.about_container}>
				<div>
					<h5 className="text-md font-extrabold text-[var(--background)]">Foundation & Journey</h5>
					<p className="text-[var(--background)]">
						I’m Tushar Yadav, a dedicated MERN Stack Developer with a solid academic foundation in Mechanical Engineering from KIIT University, complemented by a minor in Computer Science.This blend of technical disciplines has equipped me with a unique perspective, fueling my passion for innovative problem - solving and effective application design.
					</p>
				</div>
				<div>
					<h5 className="text-md font-extrabold text-[var(--background)]">Crafting Innovative Web Solutions</h5>
					<p className="text-[var(--background)]">
						Currently at Suventure Services, I specialize in developing robust full-stack web applications using ReactJS, Node.js, and JavaScript. I am committed to delivering scalable, high-performance solutions that drive measurable impact. For a comprehensive look at my experience and accomplishments, please refer to my attached resume.
					</p>
				</div>
			</div>
			{/* <MarqueeText /> */}
		</div>
	);
};

export default About;





