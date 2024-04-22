import React, { useState, useEffect } from 'react';
import { Welcome } from '../components/Welcome';
import { recipeShort } from '../data/recipeShort';
import { getRandomItem } from '../services/scripts';
import { RecipeSection } from '../components/RecipeSection';
export default function Home() {

  const [defaultRecipe, setDefaultRecipe] = useState('')


  useEffect(() => {
    async function fetchData() {
      try {
        setDefaultRecipe(getRandomItem(recipeShort.collection))
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchData()
  }, [])


  useEffect(() => {
    console.log(defaultRecipe)
  }, [setDefaultRecipe, defaultRecipe])


  return (
    <div className='recipe-page' >
      <Welcome />
      {defaultRecipe &&
        <>
          <RecipeSection data={defaultRecipe} />
        </>
      }
    </div>
  );
}

