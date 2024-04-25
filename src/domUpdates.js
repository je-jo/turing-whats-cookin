//NOTE: Your DOM manipulation will occur in this file

import ingredientsData from './data/ingredients';
import recipeData from './data/recipes';
import { filterByTag, searchRecipes, findRecipeIngredients, calculateCost, getInstructions, getAllTags } from './recipes';

const tagList = document.querySelector("#tag-list");
const searchBox = document.querySelector("#search");
const btnSearch = document.querySelector("#btn-search");
const btnShowTags = document.querySelector("#btn-tags");
const btnFilter = document.querySelector("#btn-filter");

let checkBoxes = [];
let values = [];

const viewInfo = document.querySelector("#view-info");
const selectedTags = document.querySelector("#selected-tags");
const recipeDisplay = document.querySelector("#recipe-list");

const recipeModal = document.querySelector("#recipe-modal");
const recipeImg = document.querySelector("#recipe-img");
const recipeTitle = document.querySelector("#recipe-title");
const recipeIngredientsList = document.querySelector("#recipe-ingredients");
const recipeCost = document.querySelector("#recipe-cost");
const recipeInstructionsList = document.querySelector("#recipe-instructions");
const btnClose = document.querySelector("#btn-close");
btnClose.addEventListener("click", () => {
  recipeModal.close();
});



const renderChosenRecipe = (e) => {
  let recipeId;
  if (e.target.closest(".card")) {
    recipeId = Number(e.target.closest(".card").id)
  }
  const recipe = recipeData.find(recipe => recipe.id === recipeId);
  recipeImg.setAttribute("src", recipe.image);
  recipeImg.setAttribute("alt", recipe.name);
  recipeTitle.textContent = recipe.name;
  recipeIngredientsList.textContent = "";
  const ingredientNames = findRecipeIngredients(recipeData, recipeId, ingredientsData);
  recipe.ingredients.forEach((ingredient, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${ingredientNames[index]} - ${ingredient.quantity.amount} ${ingredient.quantity.unit}`;
    recipeIngredientsList.appendChild(listItem);
  });
  recipeCost.textContent = calculateCost(recipeData, recipeId, ingredientsData);
  recipeInstructionsList.textContent = "";
  const instructions = getInstructions(recipeData, recipeId);
  instructions.forEach(instruction => {
    const listItem = document.createElement("li");
    listItem.textContent = instruction;
    recipeInstructionsList.appendChild(listItem);
  });
  setTimeout(() => {
    recipeModal.showModal();
  }, 100)
}

recipeDisplay.addEventListener("click", renderChosenRecipe);


// helper functions

const toggleVisibility = (e) => {
  e.preventDefault()
  tagList.classList.toggle("hidden")
}

const renderTagList = () => {
  const allTags = getAllTags(recipeData);
  allTags.forEach(tag => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", tag);
    checkbox.setAttribute("value", tag);
    const label = document.createElement("label");
    label.setAttribute("for", tag)
    label.textContent = tag;
    const listItem = document.createElement("li");
    listItem.classList.add("form-control");
    listItem.appendChild(checkbox)
    listItem.appendChild(label)
    tagList.appendChild(listItem)
  });
};

// regular functions

const renderRecipes = (list) => {
  recipeDisplay.textContent = "";
  list.forEach(recipe => {
    const image = document.createElement("img");
    image.setAttribute("src", recipe.image);
    image.setAttribute("alt", recipe.name);
    const title = document.createElement("h3");
    title.textContent = recipe.name;
    const listItem = document.createElement("li");
    listItem.setAttribute("id", recipe.id)
    listItem.classList.add("card");
    listItem.appendChild(image)
    listItem.appendChild(title)
    recipeDisplay.appendChild(listItem)
  })
}

const renderSearchResults = (e) => {
  e.preventDefault();
  let list;
  if (searchBox.value && checkBoxes.length) {
    viewInfo.textContent = `Viewing search results for "${searchBox.value}" in selected tags:`
    values = checkBoxes.map(checkbox => checkbox.value);
    list = filterByTag(recipeData, values);
  } else if (searchBox.value) {
    viewInfo.textContent = `Viewing search results for "${searchBox.value}" in all recipes:`
    list = recipeData;
  } else {
    viewInfo.textContent = "Viewing all the recipes:"
    list = recipeData;
  }
  const filteredList = searchRecipes(list, searchBox.value);
  searchBox.value = "";
  if (filteredList === "Sorry, no match found") {
    recipeDisplay.textContent = "Sorry, no match found, please try different search terms."
  } else {
    renderRecipes(filteredList);
  }
}

const renderFiltered = (e) => {
  e.preventDefault();
  checkBoxes = [...tagList.querySelectorAll(":checked")];
  values = checkBoxes.map(checkbox => checkbox.value);
  selectedTags.textContent = "";
  if (values.length) {
    viewInfo.textContent = `Viewing recipes filtered by selected tags:`;
    values.forEach(value => {
      const tag = document.createElement("span");
      tag.textContent = value;
      selectedTags.appendChild(tag)
    });

    const filteredList = filterByTag(recipeData, values);
    renderRecipes(filteredList);
  } else {
    viewInfo.textContent = "Viewing all the recipes:"
    renderRecipes(recipeData)
  }
}

//Here is an example function just to demonstrate one way you can export/import between the two js files. You'll want to delete this once you get your own code going.
const displayRecipes = () => {
  console.log(`Displaying recipes now`)
}

renderTagList();
renderRecipes(recipeData);

btnSearch.addEventListener("click", renderSearchResults)
btnShowTags.addEventListener("click", toggleVisibility)
btnFilter.addEventListener("click", renderFiltered);
btnFilter.addEventListener("click", toggleVisibility);


export {
  renderTagList,
  displayRecipes,
}