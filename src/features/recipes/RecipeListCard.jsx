import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Parallax, ParallaxBanner } from "react-scroll-parallax";
//import LazyImage from '../tests/LazyImage';

const LazyImage = lazy(() => import('../tests/LazyImage'))

export function RecipeListCard({ item, recipe_id }) {

    function Loading() {
        return (
            <div className='loading' style={{ fontFamily: 'Lato', fontSize: '1.5em', fontWeight: '300' }}>
                <p><i>Image loading</i></p>;
            </div>
        )
    }

    return (
        <Parallax
            className='recipe-card-main'

        >
            <Parallax
                className='recipe-card-img-main'
            //speed={5}
            >
                <Suspense fallback={<Loading />}>
                    <LazyImage image={item.image} />
                </Suspense>

                {/*  <img src={item.image} />*/}
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