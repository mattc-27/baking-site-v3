import React, { useState, useEffect } from 'react';
import { Parallax, ParallaxBanner } from "react-scroll-parallax";
import { RecipeCard } from '../features/recipes/RecipeCard';
export function RecipeSection({ data }) {

    return (

        <div className='recipe-card-section' >
            <RecipeCard item={data} recipe_id={data.id} />
        </div>

    );
}