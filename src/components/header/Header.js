import React from "react";
import styles from "./header.module.css";

const Header = () => {
	return (
		<nav className={styles.header}>
			<div className={styles.logo}>
				<img
					src={require("../../assets/logo.png")}
					alt='LOGO'
					onClick={() => {
						window.open("http://trydo.rainbowit.net/dark-main-demo");
					}}
				/>
			</div>
			<div className={styles.container_right}>
				<div className={styles.links}>
					<h5>Home</h5>
					<h5>Services</h5>
					<h5>About</h5>
					<h5>Pages</h5>
					<h5>Blocks</h5>
					<h5>Contact</h5>
				</div>
				<button className={styles.button}>BUY NOW</button>
			</div>
		</nav>
	);
};

export default Header;
