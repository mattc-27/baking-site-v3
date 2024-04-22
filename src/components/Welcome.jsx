import React, { useState, useEffect } from 'react';
import { Parallax, ParallaxBanner } from "react-scroll-parallax";

export function Welcome() {

    return (
        <ParallaxBanner
            className='welcome-section'
        >
            <Parallax
                translateY={[
                    '0%',
                    '0%'
                ]}
                opacity={['2', '0']}
                className='welcome-content'
            >
                <h3>
                    Welcome to GetBakedWith.Me!
                </h3>
                <p> This site is both a collection of my favorite recipes, and an ongoing web development project.
                    Enjoy!
                </p>
            </Parallax>
        </ParallaxBanner>
    );
}