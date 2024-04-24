function renderAllRecipesContainer(parentID) {
    document.getElementById(parentID).innerHTML = "";
    sortPopUpVisible = false;
    popUpVisible = false;
    searchPopUpVisible = false;
    let recipesPage = document.createElement("div");
    recipesPage.id = "allRecipesPage";
    document.getElementById(parentID).append(recipesPage);

    navigation("allRecipesPage");

    recipesPage.innerHTML += `
    <div id="allRecipesContainer"></div>
    `;

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


    for (let recipe of State.get()) {
        renderRecipesList("allRecipesContainer", recipe);
    }
}


