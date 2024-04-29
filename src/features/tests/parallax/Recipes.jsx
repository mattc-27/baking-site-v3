import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import { RecipeList } from '../features/recipes/RecipeList';


export default function Recipes() {

  const [filter, setFilter] = useState('');

  const [defaultRecipes, setDefaultRecipes] = useState([]);
  const [pageHeight, setPageHeight] = useState();

  const [filtered, setFiltered] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/recipes/all`)
        const data = await response.json()
        console.log(data)
        setDefaultRecipes(data.recipes)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchData()
  }, [])



  return (
    <div className='recipe-page'  >
      {defaultRecipes &&
        <RecipeList data={defaultRecipes} />
      }
    </div >
  );
}
