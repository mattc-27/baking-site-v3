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
            }
        ]
    }
]);

export default function App() {

    return (
        <ParallaxProvider>
            <RouterProvider router={router} />
        </ParallaxProvider>
    );
}