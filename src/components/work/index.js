import React from "react";
import styles from "./work.module.css";

const experienceData = {
	sectionId: "work",
	title: "Experience",
	description:
		"With a strong background in software development and project management, I have dedicated my career to delivering high-quality solutions across diverse industries.",
	funFactsTitle: "Our Fun Facts",
	facts: [
		{
			value: 3,
			unit: "+",
			description: "Years of professional experience in the tech industry."
		},
		{
			value: 10,
			unit: "+",
			description: "Successfully delivered projects for clients across various sectors."
		},
		{
			value: "🤐",
			unit: " ",
			description: "Awards and certifications that validate my expertise and commitment to excellence."
		}
	]
};


const Work = () => {
	return (
		<div className={`${styles.container} mb-32`} id={`${experienceData.sectionId}`}>
			<div className="text-[var(--background)]">
				<h2>{experienceData.title}</h2>
				<p>
					{experienceData.description}
				</p>
			</div>
			<div className={styles.facts_container}>
				<div className={`${styles.facts} text-[var(--background)]`}>{experienceData.funFactsTitle}</div>
				<div className={styles.facts_cardContainer}>
					{experienceData.facts.map((fact, index) => (
						<div className={`${styles.facts_card} text-center`} key={index}>
							<div> 
								{fact.value}
								<span>{fact.unit}</span>
							</div>
							<p className="text-[var(--background)] w-[90%]">{fact.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Work;
