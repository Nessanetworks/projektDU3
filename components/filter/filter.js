function filterRecipes(sort_type, ingredients) {
    let shortestTimeBox;
    let longestTimeBox;

    let selectedRecipes = State.get();

    if (sort_type === "sort_shortest") {
        shortestTimeBox = document.getElementById("checkShortestTime");
        longestTimeBox = document.getElementById("checkLongestTime");
        longestTimeBox.checked = false;
        // selectedRecipes = filterByShortestTime(selectedRecipes);

        // updateRecipesList(selectedRecipes);



        // return selectedRecipes;
    } else if (sort_type === "sort_longest") {
        shortestTimeBox = document.getElementById("checkShortestTime");
        longestTimeBox = document.getElementById("checkLongestTime");
        shortestTimeBox.checked = false;
        // selectedRecipes = filterByLongestTime(selectedRecipes);
        // updateRecipesList(selectedRecipes);

        // return selectedRecipes;
    }

    const checked_boxes = [...document.querySelectorAll("input[type=checkbox]")].filter(checkbox => checkbox.checked);
    console.log(checked_boxes)

    if (ingredients !== undefined) {
        console.log(ingredients);
        selectedRecipes = selectedRecipes.filter(recipe => {
            for (let key in recipe.ingredients) {
                if (key.includes(ingredients)) return recipe;
            }
        })
    }

    if (checked_boxes.length !== 0) {
        for (let i = 0; i < checked_boxes.length; i++) {
            switch (checked_boxes[i].id) {
                case "checkLowestRanking": selectedRecipes = filterByLowestRank(selectedRecipes); break;
                case "checkHighestRanking": selectedRecipes = filterByHighestRank(selectedRecipes); break;
                case "checkShortestTime": { selectedRecipes = filterByShortestTime(selectedRecipes); console.log(selectedRecipes); break; }
                case "checkLongestTime": selectedRecipes = filterByLongestTime(selectedRecipes); break;
            }
        }
    }
    // else {
    //     selectedRecipes = State.get();
    // }

    updateRecipesList(selectedRecipes);

    // if (shortestTimeBox.checked) {
    // }

    // if (longestTimeBox.checked) {
    // }
}


function filterByShortestTime(recipes) {
    recipes.sort(function (a, b) {
        return a.time - b.time;
    });

    return recipes;
}

function filterByLongestTime(recipes) {
    recipes.sort(function (a, b) {
        return b.time - a.time;
    })

    return recipes;
}