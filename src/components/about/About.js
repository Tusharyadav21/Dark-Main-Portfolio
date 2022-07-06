import React from "react";
import styles from "./about.module.css";

const About = () => {
	return (
		<div className={styles.container}>
			<div className={styles.image}>
				<img src={require("../../assets/about-1.jpg")} alt='Mountains' />
			</div>
			<div className={styles.about}>
				<h2>About</h2>
				<p>
					There are many variations of passages of Lorem Ipsum available, but the majority have
					suffered alteration in some form, by injected humour, or randomised words which dont look
					even slightly believable. If you are going to use a passage of Lorem Ipsum,
				</p>
				<div className={styles.about_container}>
					<div>
						<h3>Who we are</h3>
						<p>
							There are many vtions of passages of Lorem Ipsum available, but the majority have
							suffered.
						</p>
					</div>
					<div>
						<h3>Who we are</h3>
						<p>
							There are many vtions of passages of Lorem Ipsum available, but the majority have
							suffered.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
