// Setup express
const express = require('express');
const pool = require('./db');

// Import middleware
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const cors = require('cors');


// Create express app
const app = express();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const corsOptions = {
    origin: 'http://localhost:5000',
    methods: 'GET, POST, PUT',
    allowedHeaders: 'Content-Type,Authorization'
};

// Implement middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser())

//app.use(methodOverride('_method'))


// Serve static file

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});



const recipeRoutes = require('./recipes');
app.use(`/api/recipes`, recipeRoutes);

app.get('/api/fullRecipe/:recipe_id', async (req, res) => {
    const { recipe_id } = req.params;

    try {

           /* Fetch main recipe details
        const lookupRecipe = await pool.query("select * from recipes where id = $1", [recipe_id])
        const mainRecipe = lookupRecipe.rows[0]

        Fetch ingredients for main recipe
        const lookupIng = await pool.query(
            `select name as ingredient_name, quantity, unit from ingredients where recipe_id = $1`, [recipe_id]
        )
        const ingredients = lookupIng.rows;

        Fetch instructions for main recipe
        const lookupInst = await pool.query(
            `select * from instructions where recipe_id = $1`, [recipe_id]
        )
        const instructions = lookupInst.rows;

       Fetch sub-recipes and sub-ingredients
       const subRecipesQuery = await pool.query(`SELECT * FROM sub_recipes WHERE recipe_id = $1`, [recipe_id])
           const subRecipe = subRecipesQuery.rows;
   
           const subIngredientsQuery = await pool.query("SELECT * FROM sub_ingredients WHERE recipe_id = $1", [recipe_id]);
   
           const subIngredients = subIngredientsQuery.rows;
           */

           const recipeMain = await pool.query(
            `select r.id,
            r.title as title,
            json_agg(i.*) as ingredients
            from recipes r
            left join
            ingredients i on r.id = i.recipe_id
            where r.recipe_id = $1
            group by r.id`, [recipe_id]
           )
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
             recipe: recipeMain.rows,
            /*       ingredients,
            instructions}, */
            options: recipeOptions.rows
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, error: 'Server Error' });
    }
});

/*
app.get('/api/recipes/list_recipes', async (req, res) => {
    try {
        const result = await pool.query(
            "select * from recipes"
        )
        res.send({ recipes: result.rows })
    } catch (error) {
        console.error(error.message)
    }
})


app.get('/api/recipeTest/:recipe_id', async (req, res) => {

    const { recipe_id } = req.params;

    try {
        const recipe = await pool.query(
            "select * from recipes where id = $1", [recipe_id]
        )

        const hasIngredients = await checkIngredients(recipe_id)
        if (hasIngredients === true) {
            const ingredients = await pool.query(
                `select name as ingredient_name, quantity, unit from ingredients where recipe_id = $1`, [recipe_id]
            )

            res.status(200).send({ success: true, recipe: recipe.rows[0], ingredients: ingredients.rows })

        } else {
            res.status(200).send({ success: true, recipe: recipe.rows[0] })
        }

    } catch (error) {
        console.error(error.message)
    }
})




app.get('/api/fullRecipe/:recipe_id', async (req, res) => {

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
        console.error(error.message)
    }
})

/* 
app.get('/api/fullRecipe/:recipe_id', async (req, res) => {

    const { recipe_id } = req.params;

    try {
        const recipe = await pool.query(
            "select * from recipes where id = $1", [recipe_id]
        )

        const subRecipe = await pool.query(
            "select * from sub_recipes where recipe_id = $1", [recipe_id]
        )
  
            const subIng = await pool.query(
                "select * from sub_ingredients where recipe_id = $1", [recipe_id]
            )
        

        const recipeComponents = await checkRecipeComponents(recipe_id)
        if (recipeComponents.hasIngredients && recipeComponents.hasInstructions) {
            const ingredients = await pool.query(
                `select name as ingredient_name, quantity, unit from ingredients where recipe_id = $1`, [recipe_id]
            )
            const instructions = await pool.query(
                `select * from instructions where recipe_id = $1`, [recipe_id]
            )

            res.status(200).send({ success: true, recipe: recipe.rows[0], ingredients: ingredients.rows, instructions: instructions.rows, recipeMini: subRecipe.rows, ingMini: subIng.rows })

        } else if (recipe.hasIngredients && recipeComponents.hasInstructions === false) {
            const ingredients = await pool.query(
                `select name as ingredient_name, quantity, unit from ingredients where recipe_id = $1`, [recipe_id]
            )
            res.status(200).send({ success: true, recipe: recipe.rows[0], ingredients: ingredients.rows, recipeMini: subRecipe.rows, ingMini: subIng.rows })

        } else {
            res.status(200).send({ success: true, recipe: recipe.rows[0], recipeMini: subRecipe.rows, ingMini: subIng.rows })
        }

    } catch (error) {
        console.error(error.message)
    }
})


async function checkIngredients(recipe_id) {
    try {
        const query = await pool.query(
            `select exists(select 1 from ingredients where recipe_id = $1) as row_exists`, [recipe_id]
        )
        console.log(query)
        return query.rows[0].row_exists;
    } catch (error) {
        console.log(error.message)
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
*/

// Setup default port
app.set('port', process.env.PORT || 5000);

// Start express app
app.listen(app.get('port'), () => {
    console.log(`Server running at port: ${app.get('port')}`)
});