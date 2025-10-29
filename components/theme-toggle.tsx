"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CloudMoon, CloudSun } from "lucide-react";
import { GtmEventData } from "@/lib/utils";

const ThemeToggle = ({
	className = "",
	gtmEvent,
}: {
	className?: string;
	gtmEvent: GtmEventData;
}) => {
	const [theme, setTheme] = useState(() => {
		if (typeof window === "undefined") return "dark";

		let savedTheme;
		try {
			savedTheme = localStorage.getItem("theme");
		} catch (e) {
			console.error("LocalStorage access error:", e);
		}

		const systemDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		return savedTheme || (systemDark ? "dark" : "light");
	});

	useEffect(() => {
		if (!theme) return;
		document.documentElement.classList.remove(
			"light",
			"dark"
		);
		document.documentElement.classList.add(theme);
		try {
			localStorage.setItem("theme", theme);
		} catch (e) {
			console.error("LocalStorage save error:", e);
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) =>
			prev === "dark" ? "light" : "dark"
		);
	};

	return (
		<Button
			onClick={toggleTheme}
			className={`${className}`}
			gtmEvent={gtmEvent}
		>
			{theme === "light" ? (
				<CloudMoon height={28} width={28} fill='#fffff' />
			) : (
				<CloudSun height={28} width={28} fill='#00000' />
			)}
		</Button>
	);
};

export default ThemeToggle;
