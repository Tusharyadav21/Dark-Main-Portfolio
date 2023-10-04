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
					Hey, My name is <b>Tushar</b>. I did my <b>B-Tech</b> Degree from <b>KIIT University</b> (Bhubhneshwar), where {" "}
					<b>Mechanical Engineering</b> as my major and <b>Computer Science & Engineering</b> as my minor. Currently I am working as a <b>Frontend Developer</b> at <b>Suventure Services</b>.
				</p>
				<div className={styles.about_container}>
					<div>
						<h3>Who I am</h3>
						<p>
							Tech-savvy Frontend Web Developer familiar with wide range of programming utilities
							and languages. Knowledgeable of frontend development requirements as well as backend development. I am a passionate
							Web Developer.
						</p>
					</div>
					<div>
						<h3>What I do</h3>
						<p>
							I'm a Frontend Developer with hands on experience of ReactJS & JavaScript. I'm aiming
							for a Full Stack Web Developer, I'm looking for opportuinities to
							contribute my knowledge, skills, experience on frontend development as well as backend development.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
