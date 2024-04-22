import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Parallax, ParallaxBanner } from "react-scroll-parallax";

export function RecipeCard({ item, recipe_id }) {

   
    return (

        <ParallaxBanner
            translateY={[
                '50%',
                '-50%'
            ]}

            className='recipe-card'
        >
            <Parallax className='recipe-card-content'

            >
                <Parallax
                    className='recipe-card-img'
                //speed={5}
                >
                    <img src={item.image} />
                </Parallax>
                <div
                    className='recipe-card-top'
                //speed={15}
                >
                    <div
                        className='recipe-card-title'
                    >
                        <h1>{item.title}</h1>
                        <Link className='recipe-card-link'
                             to={`/recipes/view/${recipe_id}`} 
                             //to={`/recipes/view/${item.name}`} state={{ recipe: item }}
                            //to={`/recipes/view/${item.name}`} state={{ recipe: item }}
                        >View recipe
                        </Link>
                    </div>
                </div>
            </Parallax>
        </ParallaxBanner>

    );
}