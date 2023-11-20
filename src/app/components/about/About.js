import React from "react";
import Image from "next/image";

import AboutImage from "../../../assets/about-01.jpg";
import styles from "./about.module.css";

const About = () => {
	return (
		<div className={styles.container} id='about'>
			<div className={styles.image}>
				<Image height={"630.5px"} width={"400px"} src={AboutImage} alt='Mountains' />
			</div>
			<div className={styles.about}>
				<h2>About</h2>
				<p>
					Hey, My name is <b>Tushar Yadav</b>. I did my <b>B-Tech</b> Degree from{" "}
					<b>KIIT University</b> (Bhubhneshwar), with major <b>Mechanical Engineering</b> and minor{" "}
					<b>Computer Science & Engineering</b>. Currently I am working as a{" "}
					<b>MERN Stack Developer</b> at <b>Suventure Services</b>.
				</p>
				<div className={styles.about_container}>
					<div>
						<h3>Who I am</h3>
						<p>
							Tech-savvy Frontend Web Developer familiar with wide range of programming utilities
							and languages. Knowledgeable of frontend development requirements as well as backend
							development. I am a passionate Web Developer.
						</p>
					</div>
					<div>
						<h3>What I do</h3>
						<p>
							I&apos;m a MERN Stack Developer with hands on experience of ReactJS, NodeJs &
							JavaScript. I&apos;m aiming for a Full Stack Web Developer, I&apos;m looking for
							opportuinities to contribute my knowledge, skills, experience on frontend development
							as well as backend development.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
