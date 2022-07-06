import React from "react";
import styles from "./testimonials.module.css";

const Testimonials = () => {
	return (
		<div className={styles.container}>
			<h5>
				Testimonials The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for
				those interested. Sections Bonorum et Malorum original.
			</h5>
			<h6>
				<span>Testimonials</span> - COO, AMERIMAR ENTERPRISES, INC.
			</h6>
			<div className={styles.img_container}>
				<img src={require("../../assets/testimonial-1.jpg")} alt='Testimonial 1' />
				<img src={require("../../assets/testimonial-2.jpg")} alt='Testimonial 2' />
				<img src={require("../../assets/testimonial-3.jpg")} alt='Testimonial 3' />
				<img src={require("../../assets/testimonial-4.jpg")} alt='Testimonial 4' />
				<img src={require("../../assets/testimonial-5.jpg")} alt='Testimonial 5' />
			</div>
			<div className={styles.img_container}>
				<img src={require("../../assets/testimonial-6.jpg")} alt='Testimonial 6' />
				<img src={require("../../assets/testimonial-7.jpg")} alt='Testimonial 7' />
				<img src={require("../../assets/testimonial-8.jpg")} alt='Testimonial 8' />
				<img src={require("../../assets/testimonial-1.jpg")} alt='Testimonial 1' />
			</div>
		</div>
	);
};

export default Testimonials;
