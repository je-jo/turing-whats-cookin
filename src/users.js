import usersData from "./data/users";

const getRandomUser = (userList) => {
    let randomIndex =  Math.floor(Math.random() * userList.length);
    let randomUser = userList[randomIndex];
    console.table(randomUser);
    return randomUser;
}

const addToFavorites = (user, recipe) => {
    if (!user.recipesToCook.includes(recipe)) {
        user.recipesToCook.push(recipe);
    }
    return user;
}

const removeFromFavorites = (user, recipe) => {
    let indexToDelete = user.recipesToCook.findIndex(userRecipe => userRecipe.id === recipe.id);
    if (indexToDelete !== -1) {
        user.recipesToCook.splice(indexToDelete, 1)
    }
    return user;
}

const activeUser = getRandomUser(usersData);

export {
    getRandomUser,
    addToFavorites,
    removeFromFavorites,
    activeUser
}
