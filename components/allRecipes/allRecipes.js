function renderAllRecipesContainer(parentID) {
    document.getElementById(parentID).innerHTML = "";
    let recipesPage = document.createElement("div");
    recipesPage.id = "recipesPage";
    document.getElementById(parentID).append(recipesPage);
    recipesPage.innerHTML = `
    <div id="navigationContainer">
        <div id="allRecipes">ALLA RECEPT</div>
        <div id="sortRecipes">SORTERA RECEPT</div>
        <div id="searchRecipes"></div>
        <div id="navigationIcon"></div>
        <div id="logInOrUserName">LOGGA IN</div>
    </div>
    <div id="allRecipesContainer"></div>
    `;
}