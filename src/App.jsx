import React from 'react';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import { ParallaxProvider } from "react-scroll-parallax";

import './style.css';

import { Layout } from './Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import { RecipeView } from './features/recipes/RecipeView';
import BlogIndex from './blog/BlogIndex';
import { BlogLayout } from './blog/BlogLayout';
import Blog from './pages/Blog';
import ArticleView from './features/articles/ArticleView';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: `/recipes`,
                element: <Recipes />,
            },
            {
                path: `/recipes/view/:recipe_id`,
                element: <RecipeView />,
            },
            {
                path: `/blog`,
                element: <Blog />,
            },
            {
                path: `/blog/articles/view`,
                element: <ArticleView />,
            }
        ]
    },
  /*      {
        path: '/blog',
        element: <BlogLayout />,
        children: [
            {
                children: [
                { index: true, element: <BlogIndex /> },
             {
                    path: '',
                    element: 
                } 
                ]
            }
        ]
    }*/
]);

export default function App() {

    return (
        <ParallaxProvider>
            <RouterProvider router={router} />
        </ParallaxProvider>
    );
}