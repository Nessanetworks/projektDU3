function renderAllRecipesContainer(parentID) {
    document.getElementById(parentID).innerHTML = "";
    let recipesPage = document.createElement("div");
    recipesPage.id = "recipesPage";
    document.getElementById(parentID).append(recipesPage);
    recipesPage.innerHTML = `
    <div id="navigationContainer">
        <div id="navigationLeft">
            <div id="allRecipes">ALLA RECEPT</div>
            <div id="sortRecipes">SORTERA RECEPT</div>
            <div id="searchRecipes"></div>
        </div>
        <div id="navigationMiddle">
            <div id="navigationIcon"></div>
        </div>
        <div id="navigationRight">
            <div id="logInOrUserName">LOGGA IN</div>
        </div>
    </div>
    <div id="allRecipesContainer"></div>
    `;

    document.getElementById("logInOrUserName").addEventListener("click", function () {
        renderLogInPopUp("wrapper");
    });

    for(let i = 0; i < 10; i++) {
        renderRecipesList("allRecipesContainer");
    }
}