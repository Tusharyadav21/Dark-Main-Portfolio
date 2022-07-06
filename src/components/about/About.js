import React from "react";
import styles from "./about.module.css";

const About = () => {
	return (
		<div className={styles.container} id='about'>
			<div className={styles.image}>
				<img src={require("../../assets/about-01.jpg")} alt='Mountains' />
			</div>
			<div className={styles.about}>
				<h2>About</h2>
				<p>
					Hey, My name is Tushar. I recently graduated from KIIT UNIVERSITY with B-Tech Degree where
					Mechanical Engineering was my Major and Computer Science & Engineering was my Minor.
				</p>
				<div className={styles.about_container}>
					<div>
						<h3>Who I am</h3>
						<p>
							Tech-savvy Frontend Web Developer familiar with wide range of programming utilities
							and languages. Knowledgeable of frontend development requirements. I am a passionate
							Web Developer and a Photographer.
						</p>
					</div>
					<div>
						<h3>What I do</h3>
						<p>
							I'm a Frontend Developer with hands on experience of ReactJS & JavaScript. I'm aiming
							for a Full Stack Web Developer, Learning NodeJS and I'm looking for opportuinities to
							contribute my knowledge, skills, experience.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
