import React from 'react';
import styles from './skills.module.css';
import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';

const skills = [
	{
		name: "React",
		link: "https://reactjs.org/",
		image:
			"https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg",
	},
	{
		name: "Redux",
		link: "https://redux.js.org/",
		image:
			"https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/redux-colored.svg",
	},
	{
		name: "NextJs",
		link: "https://nextjs.org/docs",
		image:
			"https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nextjs-colored.svg",
	},
	{
		name: "JavaScript",
		link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
		image:
			"https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg",
	},
	{
		name: "NodeJS",
		link: "https://nodejs.org/en/",
		image:
			"https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg",
	},
	{
		name: "Express",
		link: "https://expressjs.com/",
		image:
			"https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/express-colored.svg",
	},
	{
		name: "MongoDB",
		link: "https://www.mongodb.com/",
		image:
			"https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mongodb-colored.svg",
	},
	{
		name: "TypeScript",
		link: "https://www.typescriptlang.org/",
		image:
			"https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg",
	},
	{
		name: "Python",
		link: "https://www.python.org/",
		image:
			"https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/python-colored.svg",
	},
	{
		name: "CSS3",
		link: "https://www.w3.org/TR/CSS/#css",
		image:
			"https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg",
	},
	{
		name: "TailwindCSS",
		link: "https://tailwindcss.com/",
		image:
			"https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/tailwindcss-colored.svg",
	},
	{
		name: "Docker",
		link: "https://www.docker.com/",
		image:
			"https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/docker-colored.svg",
	},
]

const SkillCard = ({ skill }) => {
	return (
		<div className="flex items-center justify-start w-36 h-18 rounded-lg">
			<p>{skill.name}</p>
		</div>
	);
};

const Skills = () => {
	return (
		<div className={`${styles.containerd} min-h-screen`} id="skills">
			<div className={styles.left}>
				<h2>Skills</h2>
				<p>These are my primary skills and I&apos;m making it stronger day by day</p>
				<Link href={`${process.env.RESUME_LINK}`} className="flex gap-1" target='blank'>
					Resume&nbsp;<LinkIcon />
				</Link>
			</div>
			<div className={styles.right}>
				{skills.map((skill, index) => (
					<SkillCard key={index} skill={skill} />
				))}
			</div>
		</div>
	);
};

export default Skills;
