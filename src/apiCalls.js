// Your fetch requests will live here!

const urlRecipes = "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes";
const urlIngredients = "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients";
const urlUsers = "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users";

const usersData = [];
const recipeData = [];
const ingredientsData = [];

// import * as domUpdates from './domUpdates';
import * as users from './users';

const getData = (url, items, container) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data[items].forEach(item => {
                container.push(item)
            })
        })
        .catch(err => {
            console.log(`Sorry, the following error occured: ${err}`)
        })
}

const getUsers = getData(urlUsers, "users", usersData);
const getRecipes = getData(urlRecipes, "recipes", recipeData);
const getIngredients = getData(urlIngredients, "ingredients", ingredientsData);

export {
    getUsers,
    getRecipes,
    getIngredients,
    usersData,
    recipeData,
    ingredientsData
}