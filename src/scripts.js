//NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css'
import apiCalls from './apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import recipeData from './data/recipes'
import ingredientsData from './data/ingredients'
// Below are examples of how you can import functions from either the recipes or domUpdates files.
import { filterByTag, searchRecipes, findRecipeIngredients, calculateCost, getInstructions } from './recipes';
import { displayRecipes } from './domUpdates'

console.log(ingredientsData)
// findRecipeIngredients("Dirty Steve's Original Wing Sauce")
displayRecipes();

// const sideDishes = filterByTag(recipeData, ["side dish"]);
// console.log("sidedishes", sideDishes)
// const pizzas = searchRecipes(recipeData, "piZzA")
// console.log("pizzas", pizzas)
// const elvisIngredients = findRecipeIngredients(recipeData, 741603, ingredientsData)
// console.log("elvis pancakes ingredients", elvisIngredients)
// const elvisCost = calculateCost(recipeData, 741603, ingredientsData)
// console.log("cost of pancakes", elvisCost)
// const elvisInstructions = getInstructions(recipeData, 741603)
// console.log("instructions: ", elvisInstructions)