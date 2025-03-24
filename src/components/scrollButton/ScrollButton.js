"use client";
import React, { useState } from "react";
import Image from "next/image";
import ScrollButtonImage from "../../assets/arrow_up_icon.png";

import styles from "./scrollbutton.module.css";
const ScrollButton = () => {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setVisible(true);
		} else if (scrolled <= 300) {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	// window.addEventListener("scroll", toggleVisible);
	return (
		<>
			<button
				className={styles.TopButton}
				onClick={scrollToTop}
				style={{ display: visible ? "inline" : "none" }}
			>
				<Image height='30px' width='30px' src={ScrollButtonImage} alt='Up Icon' />
			</button>
		</>
	);
};

export default ScrollButton;
