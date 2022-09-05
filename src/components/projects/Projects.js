import React from "react";
import styles from "./projects.module.css";

const Projects = () => {
	return (
		<div className={styles.container} id='projects'>
			<div>
				<h2>Latest Projects</h2>
				<div className={styles.top}>
					<p>These are some of my Project.</p>
					<button
						onClick={() => {
							window.open("https://github.com/Tusharyadav21?tab=repositories");
						}}
					>
						View All Projects
					</button>
				</div>
			</div>
			<div className={styles.card_container}>
				<div className={styles.card}>
					<img
						onClick={() => {
							window.open("https://react2do.netlify.app/");
						}}
						src={require("../../assets/Project-01.jpg")}
						alt='Project 1'
					/>
				</div>
				<div className={styles.card}>
					<img
						onClick={() => {
							window.open("https://omdb-api-task.netlify.app/");
						}}
						src={require("../../assets/Project-02.jpg")}
						alt='Project 2'
					/>
				</div>
				<div className={styles.card}>
					<img
						onClick={() => {
							window.open("https://tusharsport.netlify.app/");
						}}
						src={require("../../assets/Project-03.jpg")}
						alt='Project 3'
					/>
				</div>
			</div>
		</div>
	);
};

export default Projects;
