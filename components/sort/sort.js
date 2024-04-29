function renderIngredientSearch(parentID) {
    let divDom = document.createElement("div");
    divDom.id = "divSearchIngredient";
    divDom.classList.add("hide");
    document.getElementById(parentID).append(divDom);

    divDom.innerHTML = `
        <input type="text" id="inputSearchIngredient" placeholder="SÖK EFTER INGREDIENS...">
        `;

    document.querySelector("#inputSearchIngredient").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            console.log(event.target.value);
            filterRecipes(undefined, event.target.value);
        }
    });
}

function renderIngredientSort(parentID) {
    let divDom = document.createElement("div");
    divDom.id = "divSort";
    divDom.classList.add("hide");
    document.getElementById(parentID).append(divDom);

    divDom.innerHTML = `
        <div id="highestRanking">
            <ul>
                <li>HÖGST BETYG</li>
            </ul>
            <input type="checkbox" id="checkHighestRanking">
        </div>
        <div id="lowestRanking">
            <ul>
                <li>LÄGST BETYG</li>
            </ul>
            <input type="checkbox" id="checkLowestRanking">
        </div>
        <div id="longestTime">
            <ul>
                <li>LÄNGST TILLAGNINGSTID</li>
            </ul>
            <input type="checkbox" id="checkLongestTime">
        </div>
        <div id="shortestTime">
            <ul>
                <li>KORTAST TILLAGNINGSTID</li>
            </ul>
            <input type="checkbox" id="checkShortestTime">
        </div>
        `;

    divDom.querySelector("#checkHighestRanking").addEventListener("click", function () {
        filterRecipes("sort_best");
    });
    divDom.querySelector("#checkLowestRanking").addEventListener("click", function () {
        filterRecipes("sort_worst");
    });
    divDom.querySelector("#checkLongestTime").addEventListener("click", function () {
        filterRecipes("sort_longest");
    });
    divDom.querySelector("#checkShortestTime").addEventListener("click", function () {
        filterRecipes("sort_shortest");
    });
}