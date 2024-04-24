

function filterRecipes() {

    let shortestTimeBox = document.getElementById("checkShortestTime");
    let longestTimeBox = document.getElementById("checkLongestTime");
    let lowestRankingBox = document.getElementById("checkLowestRanking");
    let highestRankingBox = document.getElementById("checkHighestRanking");

    let selectedRecipes = State.get();

    if (shortestTimeBox.checked) {
        selectedRecipes = filterByShortestTime(selectedRecipes);
    }

    
}

function filterByShortestTime(recipes) {
    recipes.sort(function (a, b) {
        return a.time - b.time;
    });

    return recipes;
}