const express = require('express');
const router = express.Router();
const recipeController = require('./recipeController');


router.get(`/all`, recipeController.listRecipes);
router.get(`/view/:recipe_id`, recipeController.fetchRecipe);
router.get(`/recipe_detailed/:recipe_id`, recipeController.fetchRecipeDetailed)


module.exports = router;