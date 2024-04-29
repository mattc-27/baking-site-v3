import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { IngredientsTable } from '../../components/IngredientsTable';
import { IngredientsMiniTable } from '../../components/IngredientsMiniTable';
const LazyImage = lazy(() => import('../tests/LazyImage'))


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
    const [images, setImages] = useState('');
    const [recipeMini, setRecipeMini] = useState('')
    const [addlIng, setAddlIng] = useState('')

    useEffect(() => {
        async function fetchData() {

            try {
                const recipe = await fetch(`/api/recipes/recipe_detailed/${recipe_id}`)
                const data = await recipe.json()


                if (data.success) {

                    setCurrentRecipe(data.mainRecipe)
                    if (data.images === undefined) {
                        setImages(currentRecipe.image)
                    } else setImages(data.images)
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


    function Breadcrumbs() {
        const location = useLocation();

        return (
            <nav className='breadcrumbs-nav'>
                <div className='breadcrumb'>
                    <Link
                        to={`/recipes`}
                        className={location.pathname === `/recipes` ? "breadcrumb-active" : "breadcrumb-not-active"}
                    >Recipes</Link>
                    <span className="breadcrumb-arrow">&#x2215;</span>
                    <Link
                        to={`/recipes/view/${currentRecipe.id}`}
                        className={location.pathname === `/recipes/view/${currentRecipe.id}` ? "breadcrumb-active" : "breadcrumb-not-active"}
                    >{currentRecipe.title}</Link>
                    <span className="breadcrumb-arrow">&#x2215;</span>
                </div>
            </nav>
        )
    }

    function Loading() {
        return (
            <div className='loading' style={{ fontFamily: 'Lato', fontSize: '1.5em', fontWeight: '300' }}>
                <p><i>Image loading</i></p>;
            </div>
        )
    }

    return (
        <div className='recipe-view-container'>

            {currentRecipe &&
                <div className='recipe-container'>

                    <div className='recipe-content-top'>

                        <div className='recipe-page-title'>
                            <h1>{currentRecipe.title}</h1>
                        </div>

                        <Breadcrumbs />

                    </div>



                    <div className='recipe-content'>
                        {currentRecipe && images && ingredients &&
                            <>
                                <div className='ing-section'>
                                    <IngredientsTable ingredients={ingredients} />
                                    <div className='image-side'>
                                        <Suspense fallback={<Loading />}>
                                            <LazyImage image={images.length <= 1 ?
                                                currentRecipe.image
                                                : images[1].image} />
                                        </Suspense>
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
                                        <div className='instructions-section-content'>
                                            <div className='recipe-instructions'>
                                                <ol style={{ width: '100%' }}>
                                                    {instructions.map(item => (
                                                        <li key={item.step}>{item.instruction}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                            <div className='image-side-b'>
                                                <Suspense fallback={<Loading />}>
                                                    <LazyImage image={images.length <= 1 ?
                                                        currentRecipe.image
                                                        : images[1].image} />
                                                </Suspense>
                                            </div>
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
