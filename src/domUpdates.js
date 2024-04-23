//NOTE: Your DOM manipulation will occur in this file

import recipeData from './data/recipes';
import { filterByTag, searchRecipes, findRecipeIngredients, calculateCost, getInstructions, getAllTags } from './recipes';

const tagList = document.querySelector("#tag-list");
const searchBox = document.querySelector("#search")
const btnSearch = document.querySelector("#btn-search");
const btnShowTags = document.querySelector("#btn-tags")
const recipeDisplay = document.querySelector("#recipe-list");

// helper functions

const toggleVisibility = (e) => {
  e.preventDefault()
  tagList.classList.toggle("hidden")
}

// regular functions

const renderSearchResults = (e) => {
  e.preventDefault();
  const filteredList = searchRecipes(recipeData, searchBox.value);
  searchBox.value = "";
  if (filteredList === "Sorry, no match found") {
    recipeDisplay.textContent = "Sorry, no match found, please try different search terms."
  } else {
    renderRecipes(filteredList)
  }

}


const renderFiltered = (e) => {
  e.preventDefault();
  const checkBoxes = [...tagList.querySelectorAll(":checked")];
  const values = checkBoxes.map(checkbox => checkbox.value);
  if (values.length) {
    const filteredList = filterByTag(recipeData, values);
    renderRecipes(filteredList)
  } else {
    renderRecipes(recipeData)
  }
}

btnSearch.addEventListener("click", renderSearchResults)






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
    listItem.appendChild(checkbox)
    listItem.appendChild(label)
    tagList.appendChild(listItem)
  })
  const listItem = document.createElement("li");
  const btnFilter = document.createElement("button");
  btnFilter.setAttribute("id", "btn-filter");
  btnFilter.textContent = "Apply filter";
  btnFilter.addEventListener("click", renderFiltered);
  btnFilter.addEventListener("click", toggleVisibility);
  listItem.appendChild(btnFilter);
  tagList.appendChild(listItem)
};

const renderRecipes = (list) => {

  recipeDisplay.textContent = "";
  list.forEach(recipe => {
    const image = document.createElement("img");
    image.setAttribute("src", recipe.image);
    image.setAttribute("alt", recipe.name);
    const title = document.createElement("h3");
    title.textContent = recipe.name;
    const listItem = document.createElement("li")
    listItem.classList.add("card");
    listItem.appendChild(image)
    listItem.appendChild(title)
    recipeDisplay.appendChild(listItem)
  })

}

renderRecipes(recipeData)

//Here is an example function just to demonstrate one way you can export/import between the two js files. You'll want to delete this once you get your own code going.
const displayRecipes = () => {
  console.log(`Displaying recipes now`)
}

renderTagList();




btnShowTags.addEventListener("click", toggleVisibility)




export {
  renderTagList,
  displayRecipes,
}