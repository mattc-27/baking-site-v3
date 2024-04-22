import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientsTable } from '../../components/IngredientsTable';
import { IngredientsMiniTable } from '../../components/IngredientsMiniTable';
export function RecipeView() {

    const { recipe_id } = useParams()

    const [currentRecipe, setCurrentRecipe] = useState(
        ''
    );
    const [ingredients, setIngredients] = useState(
        ''
    );
    const [instructions, setInstructions] = useState(
        ''
    );
    const [recipeMini, setRecipeMini] = useState('')
    const [addlIng, setAddlIng] = useState('')

    useEffect(() => {
        async function fetchData() {

            try {
                const recipe = await fetch(`/api/recipes/recipe_detailed/${recipe_id}`)
                const data = await recipe.json()
                console.log(data)

                if (data.success) {

                    setCurrentRecipe(data.mainRecipe)

                    setIngredients(data.ingredients)
                    setInstructions(data.instructions)
                    if (data.options.length > 0) {
                        setRecipeMini(data.options)

                    }




                }
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchData()
    }, [])


    useEffect(() => {
        console.log(recipeMini)
    }, [recipeMini, setRecipeMini])


    return (
        <div className='recipe-view-container'>

            {currentRecipe &&
                <div className='recipe-container'>
                    <div className='recipe-content-top'>
                        <div className='recipe-page-title'>
                            <h1>{currentRecipe.title}</h1>
                        </div>
                    </div>
                    <div className='recipe-content'>
                        {currentRecipe && ingredients &&

                            <>
                                <div className='ing-section'>
                                    <IngredientsTable ingredients={ingredients} />


                                    <div className='image-side'>
                                        <img src={currentRecipe.image} />
                                    </div>
                                </div>
                                <div className='sub-recipe-row'>
                                {recipeMini ?
                                     
                                            recipeMini.map((item) => (
                                                <IngredientsMiniTable data={item} />
                                               
                                            ))
                                         
                                            : null}
                                               </div>
                                {instructions ?
                                    <div className='instructions-section'>
                                    
                                        <div className='instructions-section-title'>
                                            <h2>Instructions</h2>
                                        </div>
                                        <div className='recipe-instructions'>
                                            <ol style={{ width: '100%' }}>
                                                {instructions.map(item => (
                                                    <li key={item.step}>{item.instruction}</li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                    : null}
                            </>
                        }
                        {/* Tags, categories *       <p></p> */}
                        {/*    <div className='recipe-images'>
                            <>
                                <div className='images-container'>
                                    <img src={currentRecipe.image} />
                                </div>
                            </>
                        </div>
                      <div className='recipe-page-title-img' >
                            <img src={currentRecipe.image} />
                        </div>
                      */}

                    </div>
                </div>
            }

        </div>
    );
}
