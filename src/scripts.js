//NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css';
import apiCalls from './apiCalls';
import './images/turing-logo.png';
import './images/3.Nutritionist.svg';
import recipeData from './data/recipes';
import usersData from './data/users';
// import ingredientsData from './data/ingredients'

// Below are examples of how you can import functions from either the recipes or domUpdates files.
// import { filterByTag, searchRecipes, findRecipeIngredients, calculateCost, getInstructions, getAllTags } from './recipes';
import * as recipes from './recipes';
import * as users from './users';
import * as domUpdates from './domUpdates';



domUpdates.renderTagList();
domUpdates.renderCurrentViewInfo();
domUpdates.renderRecipes(recipeData);