import React from "react";
import styles from "./projects.module.css";
import Link from "next/link";

const Projects = () => {
	return (
		<div className={styles.container} id='projects'>
			<div>
				<h2>Latest Projects</h2>
				<div className={styles.top}>
					<p>These are some of my Project. You can also interact with the websites here itself.</p>
					<Link href='https://github.com/Tusharyadav21?tab=repositories' target='blank'>
						<button>View All Projects on GitHub</button>
					</Link>
				</div>
			</div>
			<div className={styles.card_container}>
				<div className={styles.card}>
					<Link href='https://react2do.netlify.app/' target='blank'>
						<iframe src={"https://react2do.netlify.app/"} />
						<h6>Visit Website</h6>
					</Link>
				</div>
				<div className={styles.card}>
					<Link href='https://omdb-api-task.netlify.app/' target='blank'>
						<iframe src={"https://omdb-api-task.netlify.app/"} />
						<h6>Visit Website</h6>
					</Link>
				</div>
				<div className={styles.card}>
					<Link href='https://tusharsport.netlify.app/' target='blank'>
						<iframe src={"https://tusharsport.netlify.app/"} />
						<h6>Visit Website</h6>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Projects;
