function filterRecipes() {
    let shortestTimeBox = document.getElementById("checkShortestTime");
    let longestTimeBox = document.getElementById("checkLongestTime");
    // let lowestRankingBox = document.getElementById("checkLowestRanking");
    // let highestRankingBox = document.getElementById("checkHighestRanking");

    let selectedRecipes = State.get();

    if (shortestTimeBox.checked) {
        longestTimeBox.checked = false;
        selectedRecipes = filterByShortestTime(selectedRecipes);
    }

    if (longestTimeBox.checked) {
        shortestTimeBox.checked = false;
        selectedRecipes = filterByLongestTime(selectedRecipes);
    }

    updateRecipesList(selectedRecipes);

    return selectedRecipes;
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