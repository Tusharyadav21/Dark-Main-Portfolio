import React from "react";
import styles from "./header.module.css";

const Header = () => {
	const scroll = (ID) => {
		const section = document.querySelector(`${ID}`);
		section.scrollIntoView({ behavior: "smooth", block: "start" });
	};
	return (
		<nav className={styles.header}>
			<div className={styles.logo}>
				<img
					src={require("../../assets/logo2.png")}
					alt='LOGO'
					onClick={() => {
						window.open("http://trydo.rainbowit.net/dark-main-demo");
					}}
				/>
			</div>
			<div className={styles.container_right}>
				<div className={styles.links}>
					<a href='#home'>Home</a>
					<a href='#about'>About</a>
					<a href='#skills'>Skills</a>
					<a href='#projects'>Projects</a>
					<a href='#contact'>Contact</a>
				</div>
			</div>
		</nav>
	);
};

export default Header;
