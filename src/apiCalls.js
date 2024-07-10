// Your fetch requests will live here!

const urlRecipes = "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes";
const urlIngredients = "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients";
const urlUsers = "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users";

const usersData = [];
const recipeData = [];
const ingredientsData = [];

import * as domUpdates from './domUpdates';
import * as users from './users';

const getUsers = fetch(urlUsers)
.then(response => response.json())
.then(data => {
    data.users.forEach(item => {
        usersData.push(item)
    })
    domUpdates.currentlyActive.user = users.getRandomUser(usersData);
})
.catch(err => {
    console.log(`Sorry, the following error occured: ${err}`)
    domUpdates.recipeDisplay.textContent = `Sorry, the following error occured: ${err}`
})


const getRecipes = fetch(urlRecipes)
.then(response => response.json())
.then(data => {
    data.recipes.forEach(item => {
        recipeData.push(item)
    })
    domUpdates.currentlyActive.list = recipeData;
    domUpdates.renderTagList();
    domUpdates.renderCurrentViewInfo();
    domUpdates.renderRecipes(recipeData)
})
.catch(err => {
    console.log(`Sorry, the following error occured: ${err}`)
    domUpdates.recipeDisplay.textContent = `Sorry, the following error occured: ${err}`
})

const getIngredients = fetch(urlIngredients)
.then(response => response.json())
.then(data => {
    data.ingredients.forEach(item => {
        ingredientsData.push(item)
    })
})
.catch(err => {
    console.log(`Sorry, the following error occured: ${err}`)
    domUpdates.recipeDisplay.textContent = `Sorry, the following error occured: ${err}`
});

export {
    usersData,
    recipeData,
    ingredientsData
}