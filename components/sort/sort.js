let searchPopUpVisible = false;

function renderIngredientSearch(parentID) {
    if (!searchPopUpVisible) {
        let divDom = document.createElement("div");
        divDom.id = "divSearchIngredient";
        document.getElementById(parentID).append(divDom);

        divDom.innerHTML = `
        <input type="text" id="inputSearchIngredient" placeholder="SÖK EFTER INGREDIENS...">
        `;
        searchPopUpVisible = true;
    } else {
        searchPopUpVisible = false;
        document.getElementById("divSearchIngredient").remove();
    }

}

let sortPopUpVisible = false;

function renderIngredientSort(parentID) {
    if (!sortPopUpVisible) {
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
        sortPopUpVisible = true;
    } else {
        sortPopUpVisible = false;
        document.getElementById("divSort").remove();
    }

}