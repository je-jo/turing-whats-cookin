//Here is an example demonstrating logic separated that can be imported into the scripts and test files. Feel free to update this later! 

import recipeData from "./data/recipes";


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

export const findRecipeIngredients = (recipeList, recipeId, ingredientsList) => {
  const recipe = recipeList.find(recipe => recipe.id === recipeId);
  const ingredientIds = recipe.ingredients.map(ingredient => ingredient.id);
  const ingredientNames = ingredientsList
    .filter(ingredient => ingredientIds.includes(ingredient.id))
    .map(ingredient => ingredient.name)
  return ingredientNames
}

export const calculateCost = (recipeList, recipeId, ingredientsList) => {
  const recipe = recipeList.find(recipe => recipe.id === recipeId);
  const ingredientIds = recipe.ingredients.map(ingredient => ingredient.id);
  const ingredientAmmounts = recipe.ingredients.map(ingredient => ingredient.quantity.amount)
  const ingredientPrices = ingredientsList
    .filter(ingredient => ingredientIds.includes(ingredient.id))
    .map(ingredient => ingredient.estimatedCostInCents)
  const totalPrice = ingredientAmmounts.reduce((acc, curr) => {
    acc += (curr * ingredientPrices[ingredientAmmounts.indexOf(curr)]) / 100
    return acc
  }, 0)
  return totalPrice
}

export const getInstructions = (recipeList, recipeId) => {
  const recipe = recipeList.find(recipe => recipe.id === recipeId);
  const instructions = recipe.instructions.map(prop => prop.instruction)
  return instructions
}

// helper function

export const getAllTags = (recipeList) => {
  const tagList = recipeList.reduce((acc, curr) => {
    curr.tags.forEach(tag => {
      if (!acc.includes(tag)) {
        acc.push(tag)
      }
    })
    return acc
  }, []);
  return tagList
};

