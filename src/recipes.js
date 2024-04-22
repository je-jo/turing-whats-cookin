//Here is an example demonstrating logic separated that can be imported into the scripts and test files. Feel free to update this later! 

import recipeData from "./data/recipes"

export const findRecipeIngredients = recipe => {
  console.log(recipe)
}

export const filterByTag = (tag) => {
  return recipeData.filter(recipe => recipe.tags.includes(tag))
}

console.log(filterByTag("antipasti"))