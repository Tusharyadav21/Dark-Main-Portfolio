"use client";
import React from "react";

const ResumeButton = () => {
	const handleResume = (url) => {
		window.open(
			"https://docs.google.com/document/d/1QgxqhtHYkbHCAOM6hxKJ46eu2EsmQdzbe812w7tu3iA/edit?usp=sharing"
		);
	};
	return (
		<button onClick={handleResume}>
			Download CV{" "}
			<svg
				width='13'
				height='14'
				viewBox='0 0 13 14'
				fill='nome'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M0.46967 11.8603C0.176777 12.1532 0.176777 12.6281 0.46967 12.921C0.762564 13.2139 1.23744 13.2139 1.53033 12.921L0.46967 11.8603ZM12.5314 1.60925C12.5314 1.19504 12.1956 0.859253 11.7814 0.859253L5.0314 0.859258C4.61719 0.859258 4.2814 1.19504 4.2814 1.60926C4.2814 2.02347 4.61719 2.35926 5.0314 2.35926L11.0314 2.35925L11.0314 8.35925C11.0314 8.77347 11.3672 9.10925 11.7814 9.10925C12.1956 9.10925 12.5314 8.77347 12.5314 8.35925L12.5314 1.60925ZM1.53033 12.921L12.3117 2.13958L11.2511 1.07892L0.46967 11.8603L1.53033 12.921Z'
					fill='white'
				/>
			</svg>
		</button>
	);
};

export default ResumeButton;
