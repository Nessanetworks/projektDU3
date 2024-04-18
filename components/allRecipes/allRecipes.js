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

    for (let i = 0; i < 10; i++) {
        renderRecipesList("allRecipesContainer");
    }
}


