function renderRecipesList(parentID, data) {
    let divDom = document.createElement("div");
    divDom.classList.add("recipesInstance");
    document.getElementById(parentID).append(divDom);

    divDom.innerHTML = `
    <div id="recipesListContainer">
        <div id="recipesListImageContainer">
            <div id="recipeImageBox">
                <img class="recipeImage" src=${data.picture}>
            </div>
        </div>
        <div id="recipesTextContainer">
            <div id="recipeTextBox"
                <p id="recipeListName">${data.name.toUpperCase()}</p>
                <div id="recipeTimeContainer">
                    <div id="timerImage"></div>
                    <p id="recipeListTime">${data.time} min</p>
                </div>
            </div>
        </div>
    </div>
    `;


    // let allRecipes = document.querySelector("#allRecipesPage").querySelectorAll("#recipesListContainer");
    // console.log("test", allRecipes)

    // for (let recipe of allRecipes) {
    divDom.addEventListener("click", () => {
        recipePage("wrapper", data);
    })
    // }


}

