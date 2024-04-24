"use strict";

function recipePage(parentID, data) {
    document.getElementById(parentID).innerHTML = "";
    sortPopUpVisible = false;
    popUpVisible = false;
    searchPopUpVisible = false;
    let recipePage = document.createElement("div");
    recipePage.id = "recipePage";
    document.getElementById(parentID).appendChild(recipePage);

    navigation("recipePage");

    recipePage.innerHTML += `
    <div id="recipeContainer">
        <div id="leftContainer">
            <img id="recipeImg" src="${data.picture}" alt="">
        </div>
        <div id="rightContainer">
            <h2>${data.name}</h2>
            <stars>
                <p>++++++</p>
            <stars>
            <h3>Lägg till betyg</h3>
            <div id="timer">
                <img id="timer" src="./media/icons/timer.png" alt="">
                <p>${data.time} min</p>
            </div>
            <div id="ingredients:">
                <h4>Ingredienser</h4>
                <ul>
                ${Object.entries(data.ingredients).map(([ingredient, quantity]) => `<li>${ingredient}: ${quantity}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h4>Gör såhär:</h4>
                <ol>
                ${data.toDo.map(instruction => `<li>${instruction}</li>`).join('')}
                </ol>
            </div>
        </div>
    </div>
    `
    document.getElementById("logInOrUserName").addEventListener("click", function () {
        renderLogInPopUp("wrapper");
    });

    document.getElementById("navigationIcon").addEventListener("click", function () {
        renderLandingPage("wrapper");
    });

    document.getElementById("searchRecipes").addEventListener("click", function () {
        renderIngredientSearch("wrapper");
    });

    document.getElementById("sortRecipes").addEventListener("click", function () {
        renderIngredientSort("wrapper");
    });

    document.getElementById("allRecipes").addEventListener("click", function () {
        renderAllRecipesContainer("wrapper");
    });

}

