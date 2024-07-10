//Here is an example demonstrating logic separated that can be imported into the scripts and test files. Feel free to update this later! 

// import ingredientsData from "./data/ingredients";
import * as data from './apiCalls'
// import recipeData from "./data/recipes";


const filterByTag = (list, tags) => {
  const filteredList = list.filter(recipe => tags.some(tag => recipe.tags.includes(tag)));
  return filteredList;
}

const searchRecipes = (list, searchTerm) => {
  let searchResults = [];
  const lowercasedSearchTerm = searchTerm.toLowerCase();
  const recipeByName = list.filter(recipe => {
    let lowercasedName = recipe.name.toLowerCase();
    return lowercasedName.includes(lowercasedSearchTerm);
  });
  searchResults = recipeByName;
  list.forEach(recipe => {
    const ingredients = findRecipeIngredients(list, recipe.id, data.ingredientsData);
    ingredients.forEach(ingredient => {
      if (ingredient.includes(lowercasedSearchTerm) && !searchResults.includes(recipe)) {
        searchResults.push(recipe)
      }
    })
  });
  return searchResults;
}

const findRecipeIngredients = (recipeList, recipeId, ingredientsList) => {
  const recipe = recipeList.find(recipe => recipe.id === recipeId);
  const ingredientIds = recipe.ingredients.map(ingredient => ingredient.id);
  const ingredientNames = ingredientIds.map(ingredientId => {
    ingredientsList.forEach(ingredient => {
      if (ingredient.id === ingredientId) {
        ingredientId = ingredient.name
      }
    });
    return ingredientId;
  })
  return ingredientNames;
}

const calculateCost = (recipeList, recipeId, ingredientsList) => {
  const recipe = recipeList.find(recipe => recipe.id === recipeId);
  const ingredientIds = recipe.ingredients.map(ingredient => ingredient.id);
  const ingredientAmmounts = recipe.ingredients.map(ingredient => ingredient.quantity.amount)
  const ingredientPrices = ingredientIds.map(ingredientId => {
    ingredientsList.forEach(ingredient => {
      if (ingredient.id === ingredientId) {
        ingredientId = ingredient.estimatedCostInCents;
      }
    })
    return ingredientId;
  })
  const totalPrice = ingredientAmmounts.reduce((acc, curr) => {
    acc += (curr * ingredientPrices[ingredientAmmounts.indexOf(curr)]) / 100
    return acc
  }, 0)
  return totalPrice
}

const getInstructions = (recipeList, recipeId) => {
  const recipe = recipeList.find(recipe => recipe.id === recipeId);
  const instructions = recipe.instructions.map(prop => prop.instruction)
  return instructions
}

// helper function

const getAllTags = (recipeList) => {
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

export {
  filterByTag,
  searchRecipes,
  findRecipeIngredients,
  calculateCost,
  getInstructions,
  getAllTags
}

