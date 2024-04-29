import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Parallax, ParallaxBanner } from "react-scroll-parallax";
//import LazyImage from '../tests/LazyImage';

const LazyImage = lazy(() => import('../tests/LazyImage'))

export function ArticleCard({ item, id }) {

    function Loading() {
        return (
            <div className='loading' style={{ fontFamily: 'Lato', fontSize: '1.5em', fontWeight: '300' }}>
                <p><i>Image loading</i></p>;
            </div>
        )
    }

    return (
        <div
            className='article-card-main'

        >
         {/*    <Parallax
                className='article-card-img-main'
            //speed={5}
            >
                <Suspense fallback={<Loading />}>
                    <LazyImage image={item.image} />
                </Suspense>

                 <img src={item.image} />
            </Parallax>*/}
            <div
                className='article-card-top-main'
            //speed={15}
            >
                <div
                    className='article-card-title-main'
                >
                    <h1>{item.title}</h1>
                    <Link
                        className='article-card-link-main'
                        to={`/blog/articles/view`}
                    
                    >View article
                    </Link>
                </div>
            </div>
        </div>
    );
}