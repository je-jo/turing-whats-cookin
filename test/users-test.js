import { expect } from 'chai';
import { testUsersData, testRecipeData } from '../src/data/sampleData';
import { addToFavorites, removeFromFavorites } from '../src/users';

let user;
beforeEach(function () {
    user = testUsersData[0];
});

describe("Add To Favorites", () => {
    it('Should add a recipe to user\'s recipesToCook list', () => {
        const recipe1 = testRecipeData[0];
        const updatedUser1 = addToFavorites(user, recipe1);
        expect(updatedUser1.recipesToCook).to.deep.equal([{
            "id": 595736,
            "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
            "ingredients": [
                {
                    "id": 20081,
                    "quantity": {
                        "amount": 1.5,
                        "unit": "c"
                    }
                },
                {
                    "id": 18372,
                    "quantity": {
                        "amount": 0.5,
                        "unit": "tsp"
                    }
                },
                {
                    "id": 1123,
                    "quantity": {
                        "amount": 1,
                        "unit": "large"
                    }
                }],
            "instructions": [
                {
                    "instruction": "In a large mixing bowl, whisk together the dry ingredients...",
                    "number": 1
                },
                {
                    "instruction": "Add egg and vanilla and mix until combined.",
                    "number": 2
                },
                {
                    "instruction": "Add dry ingredients and mix on low just until...",
                    "number": 3
                }],
            "name": "Loaded Chocolate Chip Pudding Cookie Cups",
            "tags": [
                "antipasti",
                "starter",
                "snack",
                "appetizer",
                "antipasto",
                "hor d'oeuvre"
            ]
        }])
    });
    it('Should add another recipe to user\'s recipesToCook list', () => {
        const recipe2 = testRecipeData[1];
        const updatedUser2 = addToFavorites(user, recipe2);
        expect(updatedUser2.recipesToCook).to.deep.equal([{
            "id": 595736,
            "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
            "ingredients": [
                {
                    "id": 20081,
                    "quantity": {
                        "amount": 1.5,
                        "unit": "c"
                    }
                },
                {
                    "id": 18372,
                    "quantity": {
                        "amount": 0.5,
                        "unit": "tsp"
                    }
                },
                {
                    "id": 1123,
                    "quantity": {
                        "amount": 1,
                        "unit": "large"
                    }
                }],
            "instructions": [
                {
                    "instruction": "In a large mixing bowl, whisk together the dry ingredients...",
                    "number": 1
                },
                {
                    "instruction": "Add egg and vanilla and mix until combined.",
                    "number": 2
                },
                {
                    "instruction": "Add dry ingredients and mix on low just until...",
                    "number": 3
                }],
            "name": "Loaded Chocolate Chip Pudding Cookie Cups",
            "tags": [
                "antipasti",
                "starter",
                "snack",
                "appetizer",
                "antipasto",
                "hor d'oeuvre"
            ]
        },
        {
            "id": 678353,
            "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
            "ingredients": [
                {
                    "id": 1009016,
                    "quantity": {
                        "amount": 1.5,
                        "unit": "cups"
                    }
                },
                {
                    "id": 9003,
                    "quantity": {
                        "amount": 2,
                        "unit": ""
                    }
                }],
            "instructions": [
                {
                    "instruction": "Season the pork chops with salt and pepper and grill or pan fry...",
                    "number": 1
                }
            ],
            "name": "Maple Dijon Apple Cider Grilled Pork Chops",
            "tags": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ]
        }])
    });
    it('Should make no change if recipe is already in favorites', () => {
        const recipe3 = testRecipeData[1];
        const updatedUser3 = addToFavorites(user, recipe3);
        expect(updatedUser3.recipesToCook).to.deep.equal([{
            "id": 595736,
            "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
            "ingredients": [
                {
                    "id": 20081,
                    "quantity": {
                        "amount": 1.5,
                        "unit": "c"
                    }
                },
                {
                    "id": 18372,
                    "quantity": {
                        "amount": 0.5,
                        "unit": "tsp"
                    }
                },
                {
                    "id": 1123,
                    "quantity": {
                        "amount": 1,
                        "unit": "large"
                    }
                }],
            "instructions": [
                {
                    "instruction": "In a large mixing bowl, whisk together the dry ingredients...",
                    "number": 1
                },
                {
                    "instruction": "Add egg and vanilla and mix until combined.",
                    "number": 2
                },
                {
                    "instruction": "Add dry ingredients and mix on low just until...",
                    "number": 3
                }],
            "name": "Loaded Chocolate Chip Pudding Cookie Cups",
            "tags": [
                "antipasti",
                "starter",
                "snack",
                "appetizer",
                "antipasto",
                "hor d'oeuvre"
            ]
        },
        {
            "id": 678353,
            "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
            "ingredients": [
                {
                    "id": 1009016,
                    "quantity": {
                        "amount": 1.5,
                        "unit": "cups"
                    }
                },
                {
                    "id": 9003,
                    "quantity": {
                        "amount": 2,
                        "unit": ""
                    }
                }],
            "instructions": [
                {
                    "instruction": "Season the pork chops with salt and pepper and grill or pan fry...",
                    "number": 1
                }
            ],
            "name": "Maple Dijon Apple Cider Grilled Pork Chops",
            "tags": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ]
        }])
    });
});

describe("Remove from Favorites", () => {
    it('Should remove a recipe from user\'s recipesToCook list', () => {
        const recipe4 = testRecipeData[1]
        const updatedUser4 = removeFromFavorites(user, recipe4)
        expect(updatedUser4.recipesToCook).to.deep.equal([{
            "id": 595736,
            "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
            "ingredients": [
                {
                    "id": 20081,
                    "quantity": {
                        "amount": 1.5,
                        "unit": "c"
                    }
                },
                {
                    "id": 18372,
                    "quantity": {
                        "amount": 0.5,
                        "unit": "tsp"
                    }
                },
                {
                    "id": 1123,
                    "quantity": {
                        "amount": 1,
                        "unit": "large"
                    }
                }],
            "instructions": [
                {
                    "instruction": "In a large mixing bowl, whisk together the dry ingredients...",
                    "number": 1
                },
                {
                    "instruction": "Add egg and vanilla and mix until combined.",
                    "number": 2
                },
                {
                    "instruction": "Add dry ingredients and mix on low just until...",
                    "number": 3
                }],
            "name": "Loaded Chocolate Chip Pudding Cookie Cups",
            "tags": [
                "antipasti",
                "starter",
                "snack",
                "appetizer",
                "antipasto",
                "hor d'oeuvre"
            ]
        }])
    });
    it('Should remove another recipe from user\'s recipesToCook list', () => {
        const recipe5 = testRecipeData[0]
        const updatedUser5 = removeFromFavorites(user, recipe5)
        expect(updatedUser5.recipesToCook).to.deep.equal([])
    });
    it('Should make no change if recipe is not in user\'s recipesToCook list', () => {
        const recipe6 = testRecipeData[0];
        const recipe7 = testRecipeData[1];
        const recipe8 = testRecipeData[2];
        const updatedUser6 = addToFavorites(user, recipe6);
        const updatedUser7 = addToFavorites(user, recipe7);
        const updatedUser8 = removeFromFavorites(user, recipe8)
        expect(updatedUser8.recipesToCook).to.deep.equal([{
            "id": 595736,
            "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
            "ingredients": [
                {
                    "id": 20081,
                    "quantity": {
                        "amount": 1.5,
                        "unit": "c"
                    }
                },
                {
                    "id": 18372,
                    "quantity": {
                        "amount": 0.5,
                        "unit": "tsp"
                    }
                },
                {
                    "id": 1123,
                    "quantity": {
                        "amount": 1,
                        "unit": "large"
                    }
                }],
            "instructions": [
                {
                    "instruction": "In a large mixing bowl, whisk together the dry ingredients...",
                    "number": 1
                },
                {
                    "instruction": "Add egg and vanilla and mix until combined.",
                    "number": 2
                },
                {
                    "instruction": "Add dry ingredients and mix on low just until...",
                    "number": 3
                }],
            "name": "Loaded Chocolate Chip Pudding Cookie Cups",
            "tags": [
                "antipasti",
                "starter",
                "snack",
                "appetizer",
                "antipasto",
                "hor d'oeuvre"
            ]
        },
        {
            "id": 678353,
            "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
            "ingredients": [
                {
                    "id": 1009016,
                    "quantity": {
                        "amount": 1.5,
                        "unit": "cups"
                    }
                },
                {
                    "id": 9003,
                    "quantity": {
                        "amount": 2,
                        "unit": ""
                    }
                }],
            "instructions": [
                {
                    "instruction": "Season the pork chops with salt and pepper and grill or pan fry...",
                    "number": 1
                }
            ],
            "name": "Maple Dijon Apple Cider Grilled Pork Chops",
            "tags": [
                "lunch",
                "main course",
                "main dish",
                "dinner"
            ]
        }])
    });
})

/* 
Iteration 2 - Users
User Data
You should have functions that:

Allow a user to add/remove a recipe to/from their recipesToCook list (add to my recipesToCook)
Filter my recipesToCook by a tag. (Extension option: filter by multiple tags)
Filter my recipesToCook by its name. (Extension option: filter by name or ingredients)
Consider:
Do you already have functions that are filtering recipes? How can you ensure those existing functions are dynamic and reusable 
in a way that can accomplish the filtering required in this iteration as well?

User Stories
On load, a user should be chosen at random.

As a user, I should be able to add/remove a recipe to a list of recipes to cook
As a user, I should be able to filter my toCook recipes by a tag. (Extension option: filter by multiple tags)
As a user, I should be able to search my toCook recipes by its name. (Extension option: search by name or ingredients)

*/