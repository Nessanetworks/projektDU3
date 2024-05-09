function filterRecipes(sort_type, ingredients) {
    let shortestTimeBox;
    let longestTimeBox;

    let selectedRecipes = State.get("recipes");

    ingredients = document.querySelector("#inputSearchIngredient").value;

    if (ingredients !== "") {
        selectedRecipes = selectedRecipes.filter(recipe => {
            for (let key in recipe.ingredients) {
                if (key.includes(ingredients)) return true;
            }
            return false;
        });
    }

    if (selectedRecipes.length === 0) {
        let messageDiv = document.getElementById("message");
        messageDiv.textContent = "Inga recept hittades för den här sökningen!";
    } else {
        document.getElementById("message").textContent = "";
    }

    if (sort_type === "sort_shortest") {
        longestTimeBox = document.getElementById("checkLongestTime");
        bestRatingBox = document.getElementById("checkHighestRanking");
        worstRatingBox = document.getElementById("checkLowestRanking");
        longestTimeBox.checked = false;
        bestRatingBox.checked = false;
        worstRatingBox.checked = false;
    } else if (sort_type === "sort_longest") {
        shortestTimeBox = document.getElementById("checkShortestTime");
        bestRatingBox = document.getElementById("checkHighestRanking");
        worstRatingBox = document.getElementById("checkLowestRanking");
        shortestTimeBox.checked = false;
        bestRatingBox.checked = false;
        worstRatingBox.checked = false;
    }

    if (sort_type === "sort_worst") {
        bestRatingBox = document.getElementById("checkHighestRanking");
        shortestTimeBox = document.getElementById("checkShortestTime");
        longestTimeBox = document.getElementById("checkLongestTime");
        bestRatingBox.checked = false;
        longestTimeBox.checked = false;
        shortestTimeBox.checked = false;
    } else if (sort_type === "sort_best") {
        worstRatingBox = document.getElementById("checkLowestRanking");
        shortestTimeBox = document.getElementById("checkShortestTime");
        longestTimeBox = document.getElementById("checkLongestTime");
        worstRatingBox.checked = false;
        longestTimeBox.checked = false;
        shortestTimeBox.checked = false;
    }

    const checked_boxes = [...document.querySelectorAll("input[type=checkbox]")].filter(checkbox => checkbox.checked);

    if (checked_boxes.length !== 0) {
        for (let i = 0; i < checked_boxes.length; i++) {
            switch (checked_boxes[i].id) {
                case "checkLowestRanking": selectedRecipes = filterByLowestRank(selectedRecipes); break;
                case "checkHighestRanking": selectedRecipes = filterByHighestRank(selectedRecipes); break;
                case "checkShortestTime": selectedRecipes = filterByShortestTime(selectedRecipes); break;
                case "checkLongestTime": selectedRecipes = filterByLongestTime(selectedRecipes); break;
            }
        }
    }
    updateRecipesList(selectedRecipes);
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

function filterByHighestRank(recipes) {
    recipes.sort(function (a, b) {
        return b.rating - a.rating;
    })
    return recipes;
}

function filterByLowestRank(recipes) {
    recipes.sort(function (a, b) {
        return a.rating - b.rating;
    })
    return recipes;
}