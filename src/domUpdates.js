import ingredientsData from './data/ingredients';
import recipeData from './data/recipes';
import usersData from './data/users';
import * as recipes from './recipes';
import * as users from './users';

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

const userWelcome = document.querySelector("#user");
const btnFavorite = document.querySelector("#btn-favorite");

const changeView = document.querySelector(".change-view")


const currentlyActive = {
  user: users.getRandomUser(usersData),
  list: recipeData,
  listName: "All recipes",
  recipe: null,
  searchTerm: null,
  checkboxes: [],
  values: []
}


userWelcome.textContent = currentlyActive.user.name;



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

const closeModal = () => {
  body.style.overflow = "auto";
  recipeModal.close();
}

// set currently active

const setActiveList = (e) => {
  if (e.target.value === "fav") {
    currentlyActive.list = currentlyActive.user.recipesToCook;
    currentlyActive.listName = "Your favorites";
  } else if (e.target.value === "all") {
    currentlyActive.list = recipeData;
    currentlyActive.listName = "All recipes";
  }
  if (currentlyActive.values) {
    renderFiltered(e)
  }
  else {
    renderRecipes(currentlyActive.list);
  }
  renderCurrentViewInfo();
}

const setActiveRecipe = (e) => {
  let recipeId;
  if (e.target.closest(".card")) {
    recipeId = Number(e.target.closest(".card").id)
  }
  if (recipeId) {
    currentlyActive.recipe = recipeData.find(recipe => recipe.id === recipeId);
    renderChosenRecipe();
  }
}

// render functions

const renderCurrentViewInfo = () => {
  if (currentlyActive.values.length && currentlyActive.searchTerm) {
    viewInfo.textContent = `Viewing search results for "${currentlyActive.searchTerm}" in selected tags in ${currentlyActive.listName}:`
  } else if (currentlyActive.searchTerm) {
    viewInfo.textContent = `Viewing search results for "${currentlyActive.searchTerm}" in ${currentlyActive.listName} `
  } else if (currentlyActive.values.length) {
    viewInfo.textContent = `Viewing ${currentlyActive.listName} filtered by selected tags:`
  } else {
    viewInfo.textContent = `Viewing ${currentlyActive.listName}`;
  }
}

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

const renderChosenRecipe = () => {
  recipeImg.setAttribute("src", currentlyActive.recipe.image);
  recipeImg.setAttribute("alt", currentlyActive.recipe.name);
  if (currentlyActive.user.recipesToCook.includes(currentlyActive.recipe)) {
    btnFavorite.textContent = "Remove favorite";
  } else {
    btnFavorite.textContent = "Add favorite";
  }
  recipeTitle.textContent = currentlyActive.recipe.name;
  recipeTags.textContent = "";
  currentlyActive.recipe.tags.forEach(tag => {
    const recipeTag = document.createElement("li");
    recipeTag.classList.add("tag");
    recipeTag.textContent = tag;
    recipeTags.appendChild(recipeTag)
  })
  recipeIngredientsList.textContent = "";
  const ingredientNames = recipes.findRecipeIngredients(recipeData, currentlyActive.recipe.id, ingredientsData);
  currentlyActive.recipe.ingredients.forEach((ingredient, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${ingredientNames[index]} - ${ingredient.quantity.amount} ${ingredient.quantity.unit}`;
    recipeIngredientsList.appendChild(listItem);
  });
  recipeCost.textContent = recipes.calculateCost(recipeData, currentlyActive.recipe.id, ingredientsData).toFixed(2);
  recipeInstructionsList.textContent = "";
  const instructions = recipes.getInstructions(recipeData, currentlyActive.recipe.id);
  instructions.forEach(instruction => {
    const listItem = document.createElement("li");
    listItem.textContent = instruction;
    recipeInstructionsList.appendChild(listItem);
  });
  setTimeout(() => {
    recipeModal.showModal();
    body.style.overflow = "hidden";
  }, 100);
}

// filter and search

const renderSearchResults = (e) => {
  e.preventDefault();
  let filteredList = currentlyActive.list;
  currentlyActive.searchTerm = searchBox.value;
  if (currentlyActive.values.length) {
    filteredList = recipes.filterByTag(currentlyActive.list, currentlyActive.values);
  }
  filteredList = recipes.searchRecipes(filteredList, currentlyActive.searchTerm);
  renderCurrentViewInfo();
  searchBox.value = "";
  currentlyActive.searchTerm = null;
  if (!filteredList.length) {
    recipeDisplay.textContent = "Sorry, no match found, please try different search terms."
  } else {
    renderRecipes(filteredList);
  }
}

const renderFiltered = (e) => {
  e.preventDefault();
  currentlyActive.checkboxes = [...tagList.querySelectorAll(":checked")];
  currentlyActive.values = currentlyActive.checkboxes.map(checkbox => checkbox.value);
  selectedTags.textContent = "";
  if (currentlyActive.values.length) {
    currentlyActive.values.forEach(value => {
      const tag = document.createElement("li");
      tag.classList.add("tag");
      tag.textContent = value;
      const closeTag = document.createElement("button");
      closeTag.classList.add("btn-unselect");
      closeTag.textContent = "x"
      tag.appendChild(closeTag)
      selectedTags.appendChild(tag)
    });
    const filteredList = recipes.filterByTag(currentlyActive.list, currentlyActive.values);
    renderRecipes(filteredList);
  } else {
    renderRecipes(currentlyActive.list);
  }
  renderCurrentViewInfo();
}

const handleFilterTags = (e) => {
  if (e.target.closest("button")) {
    let tagToRemove = e.target.parentNode.firstChild.textContent;
    currentlyActive.values.splice(currentlyActive.values.indexOf(tagToRemove), 1);
    const boxToUncheck = document.getElementById(tagToRemove);
    boxToUncheck.checked = false;
    renderFiltered(e);
  }
}

// handle favorites

const handleFavorites = (e) => {
  if (currentlyActive.user.recipesToCook.includes(currentlyActive.recipe)) {
    users.removeFromFavorites(currentlyActive.user, currentlyActive.recipe);
    btnFavorite.textContent = "Add favorite";
    renderRecipes(currentlyActive.list)
  } else {
    users.addToFavorites(currentlyActive.user, currentlyActive.recipe);
    btnFavorite.textContent = "Remove favorite";
  }
  if (currentlyActive.values) {
    renderFiltered(e);
  }
  renderCurrentViewInfo();
}

//Here is an example function just to demonstrate one way you can export/import between the two js files. You'll want to delete this once you get your own code going.
// const displayRecipes = () => {
//   console.log(`Displaying recipes now`)
// }



// event listeners
changeView.addEventListener("change", setActiveList);
btnSearch.addEventListener("click", renderSearchResults);
btnShowTags.addEventListener("click", toggleVisibility);
recipeDisplay.addEventListener("click", setActiveRecipe);
tagList.addEventListener("change", renderFiltered);
selectedTags.addEventListener("click", handleFilterTags);
btnFavorite.addEventListener("click", handleFavorites);
btnClose.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (!e.target.closest("#btn-tags") && !e.target.closest("#tag-list")) {
    tagList.classList.add("hidden");
  }
});

export {
  toggleVisibility,
  renderTagList,
  closeModal,
  setActiveList,
  setActiveRecipe,
  renderCurrentViewInfo,
  renderRecipes,
  renderChosenRecipe,
  renderSearchResults,
  renderFiltered,
  handleFilterTags,
  handleFavorites
}