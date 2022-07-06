import React from "react";
import styles from "./news.module.css";

const News = () => {
	return (
		<div className={styles.container}>
			<div>
				<h2>Latest News</h2>
				<div className={styles.top}>
					<p>
						There are many variations of passages of Lorem Ipsum available, but the majority have
						suffered alteration.
					</p>
					<button>View All News</button>
				</div>
			</div>
			<div className={styles.card_container}>
				<div className={styles.card}>
					<img src={require("../../assets/blog-01.jpg")} alt='Blog 1' />
				</div>
				<div className={styles.card}>
					<img src={require("../../assets/blog-02.jpg")} alt='Blog 2' />
				</div>
				<div className={styles.card}>
					<img src={require("../../assets/blog-03.jpg")} alt='Blog 3' />
				</div>
			</div>
			<div className={styles.img_container}>
				<div>
					<img src={require("../../assets/brand-01.png")} alt='Brand 1' />
				</div>
				<div>
					<img src={require("../../assets/brand-02.png")} alt='Brand 2' />
				</div>
				<div>
					<img src={require("../../assets/brand-03.png")} alt='Brand 3' />
				</div>
				<div>
					<img src={require("../../assets/brand-04.png")} alt='Brand 4' />
				</div>
				<div>
					<img src={require("../../assets/brand-05.png")} alt='Brand 5' />
				</div>
			</div>
			<div className={styles.img_container}>
				<div>
					<img src={require("../../assets/brand-06.png")} alt='Brand 6' />
				</div>
				<div>
					<img src={require("../../assets/brand-02.png")} alt='Brand 2' />
				</div>
				<div>
					<img src={require("../../assets/brand-04.png")} alt='Brand 4' />
				</div>
				<div>
					<img src={require("../../assets/brand-03.png")} alt='Brand 3' />
				</div>
			</div>
		</div>
	);
};

export default News;
