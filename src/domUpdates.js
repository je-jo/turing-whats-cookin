import ingredientsData from './data/ingredients';
import recipeData from './data/recipes';
import * as recipes from './recipes';

const body = document.querySelector("body");
const tagList = document.querySelector("#tag-list");
const searchBox = document.querySelector("#search");
const btnSearch = document.querySelector("#btn-search");
const btnShowTags = document.querySelector("#btn-tags");

const viewInfo = document.querySelector("#view-info");
const selectedTags = document.querySelector("#selected-tags");
const recipeDisplay = document.querySelector("#recipe-list");

const recipeModal = document.querySelector("#recipe-modal");
const recipeImg = document.querySelector("#recipe-img");
const recipeTitle = document.querySelector("#recipe-title");
const recipeTags = document.querySelector("#wrapper-tags");
const recipeIngredientsList = document.querySelector("#recipe-ingredients");
const recipeCost = document.querySelector("#recipe-cost");
const recipeInstructionsList = document.querySelector("#recipe-instructions");
const btnClose = document.querySelector("#btn-close");

let checkboxes = [];
let values = [];

// helper functions

const toggleVisibility = (e) => {
  e.preventDefault()
  tagList.classList.toggle("hidden")
}

const renderTagList = () => {
  const allTags = recipes.getAllTags(recipeData);
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
    tagList.appendChild(listItem);
  });
};

// regular functions

const renderRecipes = (list) => {
  recipeDisplay.textContent = "";
  list.forEach(recipe => {
    const image = document.createElement("img");
    image.setAttribute("src", recipe.image);
    image.setAttribute("alt", recipe.name);
    image.setAttribute("width", 556);
    image.setAttribute("height", 370);
    const title = document.createElement("h3");
    title.textContent = recipe.name;
    const tagBox = document.createElement("ul");
    tagBox.classList.add("wrapper-tags");
    recipe.tags.forEach(tag => {
      const tagSpan = document.createElement("li");
      tagSpan.classList.add("tag");
      tagSpan.textContent = tag;
      tagBox.appendChild(tagSpan);
    })
    const listItem = document.createElement("li");
    listItem.setAttribute("id", recipe.id)
    listItem.classList.add("card");
    listItem.appendChild(image);
    listItem.appendChild(title);
    listItem.appendChild(tagBox);
    recipeDisplay.appendChild(listItem);
  })
}

const renderSearchResults = (e) => {
  e.preventDefault();
  let list;
  if (searchBox.value && checkboxes.length) {
    viewInfo.textContent = `Viewing search results for "${searchBox.value}" in selected tags:`
    values = checkboxes.map(checkbox => checkbox.value);
    list = recipes.filterByTag(recipeData, values);
  } else if (searchBox.value) {
    viewInfo.textContent = `Viewing search results for "${searchBox.value}" in all recipes:`
    list = recipeData;
  } else {
    viewInfo.textContent = "Viewing all the recipes:"
    list = recipeData;
  }
  const filteredList = recipes.searchRecipes(list, searchBox.value);
  searchBox.value = "";
  if (filteredList === "Sorry, no match found") {
    recipeDisplay.textContent = "Sorry, no match found, please try different search terms."
  } else {
    renderRecipes(filteredList);
  }
}

const renderFiltered = (e) => {
  e.preventDefault();
  checkboxes = [...tagList.querySelectorAll(":checked")];
  values = checkboxes.map(checkbox => checkbox.value);
  selectedTags.textContent = "";
  if (values.length) {
    viewInfo.textContent = `Viewing recipes filtered by selected tags:`;
    values.forEach(value => {
      const tag = document.createElement("li");
      tag.classList.add("tag");
      tag.textContent = value;
      const closeTag = document.createElement("button");
      closeTag.classList.add("btn-unselect");
      closeTag.textContent = "x"
      tag.appendChild(closeTag)
      selectedTags.appendChild(tag)
    });
    const filteredList = recipes.filterByTag(recipeData, values);
    renderRecipes(filteredList);
  } else {
    viewInfo.textContent = "Viewing all the recipes:"
    renderRecipes(recipeData)
  }
}

const handleFilterTags = (e) => {
  if (e.target.closest("button")) {
    let tagToRemove = e.target.parentNode.firstChild.textContent;
    values.splice(values.indexOf(tagToRemove), 1);
    const boxToUncheck = document.getElementById(tagToRemove);
    boxToUncheck.checked = false;
    renderFiltered(e);
  }
}

const renderChosenRecipe = (e) => {
  let recipeId;
  if (e.target.closest(".card")) {
    recipeId = Number(e.target.closest(".card").id)
  }
  const recipe = recipeData.find(recipe => recipe.id === recipeId);
  recipeImg.setAttribute("src", recipe.image);
  recipeImg.setAttribute("alt", recipe.name);
  recipeTitle.textContent = recipe.name;
  recipeTags.textContent = "";
  recipe.tags.forEach(tag => {
    const recipeTag = document.createElement("li");
    recipeTag.classList.add("tag");
    recipeTag.textContent = tag;
    recipeTags.appendChild(recipeTag)
  })
  recipeIngredientsList.textContent = "";
  const ingredientNames = recipes.findRecipeIngredients(recipeData, recipeId, ingredientsData);
  recipe.ingredients.forEach((ingredient, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${ingredientNames[index]} - ${ingredient.quantity.amount} ${ingredient.quantity.unit}`;
    recipeIngredientsList.appendChild(listItem);
  });
  recipeCost.textContent = recipes.calculateCost(recipeData, recipeId, ingredientsData).toFixed(2);
  recipeInstructionsList.textContent = "";
  const instructions = recipes.getInstructions(recipeData, recipeId);
  instructions.forEach(instruction => {
    const listItem = document.createElement("li");
    listItem.textContent = instruction;
    recipeInstructionsList.appendChild(listItem);
  });
  setTimeout(() => {
    recipeModal.showModal();
    body.style.overflow = "hidden";
  }, 100)
}

//Here is an example function just to demonstrate one way you can export/import between the two js files. You'll want to delete this once you get your own code going.
// const displayRecipes = () => {
//   console.log(`Displaying recipes now`)
// }



btnSearch.addEventListener("click", renderSearchResults);
btnShowTags.addEventListener("click", toggleVisibility);
recipeDisplay.addEventListener("click", renderChosenRecipe);
tagList.addEventListener("change", renderFiltered);
selectedTags.addEventListener("click", handleFilterTags);

btnClose.addEventListener("click", () => {
  body.style.overflow = "auto"
  recipeModal.close();
});

window.addEventListener("click", (e) => {
  if (!e.target.closest("#btn-tags") && !e.target.closest("#tag-list")) {
    tagList.classList.add("hidden");
  }
})


export {
  toggleVisibility,
  renderTagList,
  renderRecipes,
  renderSearchResults,
  renderFiltered,
  handleFilterTags,
  renderChosenRecipe,
}