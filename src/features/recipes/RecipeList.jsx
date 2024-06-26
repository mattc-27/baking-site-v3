// Dependencies  
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';

// Components 
import { SelectCategory } from '../filter-search/CategorySelect';
import { RecipeListCard } from './RecipeListCard';


export function RecipeList({ data }) {

  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(data);

  // 
  const [defaultRecipes, setDefaultRecipes] = useState(data);



  useEffect(() => {
    console.log(query);
    const filter = query;
    const filteredRecipes = data.filter((recipe) =>
      filter ? recipe.category === filter : true
    )
    setFilteredItems(filteredRecipes)
    console.log(filteredRecipes)
  }, [query, data])



  /* ----- 
  TESTS

  useEffect(() => {
    console.log(data);
  }, [])


  // 
  const renderRecipes = () => {
    if (filteredItems.length === 0) {
      return <p>No recipes found for the selected category.</p>;
    }
  return (
    <>
   filteredItems.map((recipe) => (
            <RecipeListCard item={recipe} />
          ))
    </>
  );
};

useEffect(() => {
  console.log(pageHeight)
}, [pageHeight])

    <div className="recipe-collection">
      {renderRecipes()}
    </div>

   */





  return (
    <>
      <div className='recipe-page-top'>
        <div className='recipe-collection-title'>
          <h1>Recipe Collection</h1>
        </div>
        <SelectCategory setQuery={setQuery} />
      </div>
      <div className="recipe-collection">
        {filteredItems &&
          filteredItems.map((recipe) => (
            <RecipeListCard item={recipe} recipe_id={recipe.id} />
          ))
        }
      </div>
    </>
  );
}
