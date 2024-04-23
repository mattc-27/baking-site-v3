const pool = require('./db');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


// List recipes

const listRecipes = async (req, res) => {

    try {
        const result = await pool.query(
            "select * from recipes"
        )
        res.send({ recipes: result.rows })


    } catch (error) {
        console.group(error)
        return res.status(500).json(error);

    }
}

// Fetch full recipe details
const fetchRecipe = async (req, res) => {

    const { recipe_id } = req.params;

    try {
        const recipe = await pool.query(
            "select * from recipes where id = $1", [recipe_id]
        )

        const recipeComponents = await checkRecipeComponents(recipe_id)
        if ( recipeComponents.hasIngredients && recipeComponents.hasInstructions ) {
            const ingredients = await pool.query(
                `select name as ingredient_name, quantity, unit from ingredients where recipe_id = $1`, [recipe_id]
            )
            const instructions = await pool.query(
                `select * from instructions where recipe_id = $1`, [recipe_id]
            )

            res.status(200).send({ success: true, recipe: recipe.rows[0], ingredients: ingredients.rows, instructions: instructions.rows })

        } else if ( recipe.hasIngredients && recipeComponents.hasInstructions === false) {
            const ingredients = await pool.query(
                `select name as ingredient_name, quantity, unit from ingredients where recipe_id = $1`, [recipe_id]
            )
            res.status(200).send({ success: true, recipe: recipe.rows[0], ingredients: ingredients.rows })

        } else {
            res.status(200).send({ success: true, recipe: recipe.rows[0] })
        }

    } catch (error) {
        console.group(error)
        return res.status(500).json(error);

    }
}

async function checkRecipeComponents(recipe_id) {
    try {
        const ingredients = await pool.query(
            `select exists(select 1 from ingredients where recipe_id = $1) as row_exists`, [recipe_id]
        )

        const hasIngredients = ingredients.rows[0].row_exists;

        const instructions = await pool.query(
            `select exists(select 1 from instructions where recipe_id = $1) as row_exists`, [recipe_id]
        )
        const hasInstructions = instructions.rows[0].row_exists;

        return { hasIngredients, hasInstructions }
    } catch (error) {
        console.log(error.message)
    }
}

// Fetch full recipe details
const fetchRecipeDetailed = async (req, res) => {

    const { recipe_id } = req.params;

    try {
    // Fetch main recipe details
    const lookupRecipe = await pool.query("select * from recipes where id = $1", [recipe_id])
    const mainRecipe = lookupRecipe.rows[0]

    // Fetch ingredients for main recipe
    const lookupIng = await pool.query(
        `select id, name as ingredient_name, quantity, unit from ingredients where recipe_id = $1 order by id asc`, [recipe_id]
    )
    const ingredients = lookupIng.rows;

    // Fetch instructions for main recipe
    const lookupInst = await pool.query(
        `select id, step, instruction from instructions where recipe_id = $1 order by step asc`, [recipe_id]
    )
    const instructions = lookupInst.rows;

    const recipeOptions = await pool.query(
        `SELECT
        sr.id AS sub_recipe_id,
        sr.created_at AS sub_recipe_created_at,
        sr.title AS sub_recipe_title,
        sr.recipe_id AS recipe_id,
        json_agg(si.*) AS sub_ingredients
    FROM
        sub_recipes sr
    LEFT JOIN
        sub_ingredients si ON sr.id = si.sub_recipe_id
    WHERE
        sr.recipe_id = $1
    GROUP BY sr.id`, [recipe_id])
    res.status(200).send({
        success: true,
         mainRecipe, ingredients, instructions,
        /*       ingredients,
        instructions}, */
        options: recipeOptions.rows
    });
    } catch (error) {
        console.group(error)
        return res.status(500).json(error);

    }
}




module.exports = {
    listRecipes,
    fetchRecipe,
    fetchRecipeDetailed
}