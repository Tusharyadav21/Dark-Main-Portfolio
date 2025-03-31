"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";


export default function NavBar() {
    const [isHidden, setIsHidden] = useState(false);
    const { scrollY } = useScroll();
    const lastYRef = useRef(0);

    useMotionValueEvent(scrollY, "change", (y) => {
        const difference = y - lastYRef.current;
        if (Math.abs(difference) > 50) {
            setIsHidden(difference > 0);

            lastYRef.current = y;
        }
    });

    return (
        <motion.div
            animate={isHidden ? "hidden" : "visible"}
            whileHover="visible"
            onFocusCapture={() => setIsHidden(false)}
            variants={{
                hidden: {
                    y: "-98%",
                },
                visible: {
                    y: "0%",
                },
            }}
            transition={{ duration: 0.2 }}
            className="fixed top-2 z-10 flex w-full justify-center pt-1 drop-shadow-[0_4px_3px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_4px_3px_rgba(255,255,255,0.25)]"
        >
            <nav className="h-12 flex justify-between gap-4 rounded-3xl text-[var(--background)] bg-[var(--text)] !md:px-8 !px-2 !py-4 *:transition-colors *:duration-400 *:hover:bg-(var[--accent])">
                <ThemeToggle className="pl-3! flex items-center justify-center" />
                <span className="inline-block w-full h-full border-r-[1px] border-(var[--text])"></span>
                <Link className="h-full flex items-center px-3! font-semibold"  href="/">Home</Link>
                <Link className="h-full flex items-center px-3! font-semibold" href="/#skills">Skills</Link>
                <Link className="h-full flex items-center px-3! font-semibold" href="/#work">Work</Link>
                <Link className="h-full flex items-center px-3! font-semibold" href="/#projects">Project</Link>
                <Link className="h-full flex items-center px-3! font-semibold" href="/#contact">Contact</Link>
            </nav>
        </motion.div>
    );
};