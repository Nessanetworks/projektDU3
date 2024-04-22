function renderIngredientSearch(parentID) {
    let divDom = document.createElement("div");
    divDom.id = "divSearchIngredient";
    document.getElementById(parentID).append(divDom);

    divDom.innerHTML = `
    <input type="text" id="inputSearchIngredient" class="hide" placeholder="SÖK EFTER INGREDIENS...">
    `;
}

function renderIngredientSort(parentID) {
    let divDom = document.createElement("div");
    divDom.id = "divSort";
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
}