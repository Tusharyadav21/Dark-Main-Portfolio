'use client';

import React from "react";
import { AnimatedTextTyping } from "../motions/AnimateTextTyping";
import About from "../about";



const Intro = () => {
    return (
        <div className='' id='home'>
            <section className="h-screen flex flex-col justify-center text-center">
                <h2>Hi.!</h2>
                <h3>scroll down...</h3>
            </section>
            <section className="min-h-screen flex flex-col text-start">
                <About />
            </section>
            {/* bg-[linear-gradient(145deg,_rgb(248, 31, 1),_rgb(238, 7, 110))] */}
        </div>
    );
};

export default Intro;

// rgb(248, 31, 1) & rgb(238, 7, 110)