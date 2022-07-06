import React from "react";
import styles from "./intro.module.css";
const Intro = () => {
	return (
		<div className={styles.container} id='home'>
			<h1 className={styles.heading}>
				Hi.!
				<br />I am TUSHAR.
			</h1>
			<div className={styles.title}>
				<div className={styles.title_wrapper}>
					<div>Frontend&nbsp;Developer</div>
					<div>ReactJs&nbsp;Developer</div>
					<div>JavaScript&nbsp;Developer</div>
				</div>
			</div>
		</div>
	);
};

export default Intro;
