import React, { useState, useEffect } from 'react';
import { Welcome } from '../components/Welcome';
import { recipeShort } from '../data/recipeShort';
import { getRandomItem } from '../services/scripts';
import { RecipeSection } from '../components/RecipeSection';
export default function BlogIndex() {

  const [defaultRecipes, setDefaultRecipes] = useState('')


  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(`/api/recipes/all`)
        const data = await result.json()
        setDefaultRecipes(data.recipes)
        //setDefaultRecipe(getRandomItem(recipeShort.collection))
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchData()
  }, [])


  useEffect(() => {
    console.log(defaultRecipes)
  }, [setDefaultRecipes, defaultRecipes])


  const Carousel = ({ recipes }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 1 < 0 ? recipes.length - 1 : prevIndex - 1
      );
    }
    const handleNextClick = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 === recipes.length ? 0 : prevIndex + 1
      );
    }
    const handleDotClick = (index) => {
      setCurrentIndex(index);
    };

    return (
      <div className='carousel'>
      <div className="recipe-card">
        <div className='recipe-card-content'>
          <img
            className='recipe-card-img'
            key={currentIndex}
            src={recipes[currentIndex].image}
          />
          <div
            className='recipe-card-top'
          //speed={15}
          >
            <div
              className='recipe-card-title'
            >
              <h1>{recipes[currentIndex].title}</h1>
            </div>


          </div>

        </div>


      </div>
      <div className="slide_direction">
{/* 
          <div className="left" onClick={handlePrevClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 96 960 960"
              width="20"
            >
              <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
            </svg>
          </div>
          <div className="right" onClick={handleNextClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 96 960 960"
              width="20"
            >
              <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
            </svg>
          </div>
        </div>*/}
        <div className="indicator">
        {recipes.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
      </div>
      </div>
    );
  }


  return (
    <div className='recipe-page' >
      <Welcome />
      {defaultRecipes &&
        <>
          <Carousel recipes={defaultRecipes} />
          {/* <RecipeSection data={defaultRecipe} /> */}
        </>
      }
    </div>
  );
}

