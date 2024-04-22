import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Parallax, ParallaxBanner } from "react-scroll-parallax";

export function RecipeListCard({ item, recipe_id }) {

    return (
        <Parallax
            className='recipe-card-main'
          
        >
            <Parallax
                className='recipe-card-img-main'
            //speed={5}
            >
                <img src={item.image} />
            </Parallax>
            <div
                className='recipe-card-top-main'
            //speed={15}
            >
                <div
                    className='recipe-card-title-main'
                >
                    <h1>{item.title}</h1>
                    <Link
                        className='recipe-card-link-main'
                        to={`/recipes/view/${recipe_id}`}
                        state={{ recipe: item }}
                    >View recipe
                    </Link>
                </div>
            </div>
        </Parallax>
    );
}