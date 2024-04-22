//Here is an example demonstrating logic separated that can be imported into the scripts and test files. Feel free to update this later! 

import { recipeData, ingredientsData } from "./data/recipes"




export const filterByTag = (list, tags) => {
  const filteredList = list.filter(recipe => tags.some(tag => recipe.tags.includes(tag)));
  if (filteredList.length) {
    return filteredList
  }
  return "Sorry, no match found."
}

export const searchRecipes = (list, searchTerm) => {
  const lowercasedSearchTerm = searchTerm.toLowerCase();
  const recipeByName = list.filter(recipe => {
    let lowercasedName = recipe.name.toLowerCase();
    return lowercasedName.includes(lowercasedSearchTerm);
  });
  if (recipeByName.length) {
    return recipeByName;
  }
  return "Sorry, no match found"
}

export const findRecipeIngredients = (recipeList, id, ingredientsList) => {
  const recipe = recipeList.find(recipe => recipe.id === id);
  const ingredientIds = recipe.ingredients.map(ingredient => ingredient.id);
  const ingredientNames = ingredientsList
    .filter(ingredient => ingredientIds.includes(ingredient.id))
    .map(ingredient => ingredient.name)
  return ingredientNames
}

// export const calculateCost = recipe => {

// }