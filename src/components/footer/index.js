import React from "react";
import Link from "next/link";

import { ContactForm } from "../contact-form/ContactForm";
import styles from "./footer.module.css";
import { GithubIcon, LinkedinIcon } from "lucide-react";

const Footer = () => {
	return (
		<div className={styles.container} id='contact'>
			<div className={styles.left}>
				<div className={styles.bg}>
					<div className={styles.left_container}>
						<h6>Ready to do this</h6>
						<h2>
							Let&apos;s get
							<br />
							to work!
						</h2>
						<br />
						{/* <Link href='mailto:Tusharydv@hotmail.com'> */}
						<ContactForm />
						{/* </Link> */}
					</div>
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.link_container}>
					<div className={styles.link_left}>
						<h5>Quick Links</h5>
						<div>
							<a href='#projects'>
								<span>Projects</span>
							</a>
						</div>
						<div>
							<a href='#about'>
								<span>About</span>
							</a>
						</div>
						<div>
							<a href='#skills'>
								<span>Skills</span>
							</a>
						</div>
					</div>
					<div className={styles.link_right}>
						<h5>Say Hello</h5>
						<div>
							{/* <Link href='mailto:Tusharydv@hotmail.com'> */}
							<span>Tusharydv@hotmail.com</span>
							{/* </Link> */}
						</div>
						<Link replace
							href={`${process.env.RESUME_LINK}`}
							target='blank'
						>
							<div>
								<span>Download CV</span>
							</div>
						</Link>
						<div className={`${styles.social_link} flex gap-8`}>
							<Link href='https://github.com/Tusharyadav21' target='blank'>
								<GithubIcon height={24} width={24} />
							</Link>
							<Link href='https://www.linkedin.com/in/tusharyadav21/' target='blank'>
								<span>
									<LinkedinIcon height={24} width={24} />
								</span>
							</Link>
						</div>
					</div>
				</div>
				<p>Copyright 2023 @ Tushar. All Rights Reserved.</p>
			</div>
		</div>
	);
};

export default Footer;
