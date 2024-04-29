import React, { useState, useEffect } from 'react';
import { Parallax, ParallaxBanner } from "react-scroll-parallax";

export function Welcome() {

    return (
        <ParallaxBanner
            className='welcome-section'
            opacity={['2', '0']}
        >
            <Parallax
                className='welcome-content'
            >
                <h3>
                    Welcome to GetBakedWith.Me!
                </h3>
                <p>Explore delectable recipes, baking tips, and sweet inspirations that will take your baking adventures to new highs.</p>
                <p>Join me for delightful tales from my kitchen, where every recipe is crafted with love and shared with joy.
                </p>
            </Parallax>
        </ParallaxBanner>
    );
}