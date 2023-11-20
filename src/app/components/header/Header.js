import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Logo from "../../../assets/logo2.png";

const Header = () => {
	return (
		<nav className={styles.header}>
			<div className={styles.logo}>
				<Image src={Logo} alt='LOGO' height={"25px"} width={"25px"} />
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
