function renderAllRecipesContainer(parentID) {
    document.getElementById(parentID).innerHTML = "";
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

    for (let recipe of State.get()) {
        renderRecipesList("allRecipesContainer", recipe);
    }
}


