import React from "react";
import styles from "./work.module.css";

const Work = () => {
	return (
		<div className={styles.container}>
			<div>
				<h2>My Projetcs</h2>
				<p>
					There are many variations of passages of Lorem Ipsum available, but the majority have
					suffered alteration.
				</p>
			</div>
			<div className={styles.facts_container}>
				<div className={styles.facts}>Our Fun Facts</div>
				<div className={styles.facts_cardContainer}>
					<div className={styles.facts_card}>
						<div>
							199<span>&#43;</span>
						</div>
						<p>
							The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those.
						</p>
					</div>
					<div className={styles.facts_card}>
						<div>
							574<span>&#43;</span>
						</div>
						<p>
							The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those.
						</p>
					</div>
					<div className={styles.facts_card}>
						<div>
							69<span>&#43;</span>
						</div>
						<p>
							The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Work;
