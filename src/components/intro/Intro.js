import React from "react";
import styles from "./intro.module.css";
const Intro = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				A Digital
				<br />
				Agency.
			</h1>
			<div className={styles.cardsContainer}>
				<div className={styles.card}>
					<img src={require("../../assets/icon-01.png")} alt='Business Strategy' />
					<h4>Business Strategy</h4>
					<p>
						There are many variations of passages of Lorem Ipsum available, but the majority have
						suffered.
					</p>
				</div>
				<div className={styles.card}>
					<img src={require("../../assets/icon-02.png")} alt='Website Development' />
					<h4>Website Development</h4>
					<p>
						There are many variations of passages of Lorem Ipsum available, but the majority have
						suffered.
					</p>
				</div>
				<div className={styles.card}>
					<img src={require("../../assets/icon-03.png")} alt='Marketing & Reporting' />
					<h4>Marketing & Reporting</h4>
					<p>
						There are many variations of passages of Lorem Ipsum available, but the majority have
						suffered.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Intro;
