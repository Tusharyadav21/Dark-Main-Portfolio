import React from "react";
import styles from "./projects.module.css";
import Image from "next/image";
import Link from "next/link";

import Project1Image from "../../assets/Project-01.jpg";
import Project2Image from "../../assets/Project-02.jpg";
import Project3Image from "../../assets/Project-03.jpg";

const Projects = () => {
	return (
		<div className={styles.container} id='projects'>
			<div>
				<h2>Latest Projects</h2>
				<div className={styles.top}>
					<p>These are some of my Project.</p>
					{/* <button
						onClick={() => {
							window.open("https://github.com/Tusharyadav21?tab=repositories");
						}}
					>
						View All Projects
					</button> */}
				</div>
			</div>
			<div className={styles.card_container}>
				<div className={styles.card}>
					<Image
						// onClick={() => {
						// 	window.open("https://react2do.netlify.app/");
						// }}
						src={Project1Image}
						alt='Project 1'
					/>
				</div>
				<div className={styles.card}>
					<Image
						// onClick={() => {
						// 	window.open("https://omdb-api-task.netlify.app/");
						// }}
						src={Project2Image}
						alt='Project 2'
					/>
				</div>
				<div className={styles.card}>
					<Link href='https://tusharsport.netlify.app/'>
						<Image src={Project3Image} alt='Project 3' />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Projects;
