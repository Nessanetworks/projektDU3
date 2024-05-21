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
    <div id="message"></div>
    <div id="allRecipesContainer"></div>
    `;

    document.getElementById("logInOrUserName").addEventListener("click", function () {
        if (localStorage.getItem("token")) {
            renderProfilePage("wrapper");
        } else {
            renderLogInPopUp("wrapper");
        }
    });

    document.getElementById("navigationIcon").addEventListener("click", function () {
        renderLandingPage("wrapper");
    });

    document.getElementById("searchRecipes").addEventListener("click", function () {
        document.getElementById("divSearchIngredient").classList.toggle("hide");
    });

    document.getElementById("sortRecipes").addEventListener("click", function () {
        document.getElementById("divSort").classList.toggle("hide");
        heartsStayFilled();
    });

    document.getElementById("allRecipes").addEventListener("click", function () {
        renderAllRecipesContainer("wrapper");
        renderIngredientSearch("wrapper");
        renderIngredientSort("wrapper");
    });

    for (let recipe of State.get("recipes")) {
        renderRecipesList("allRecipesContainer", recipe);
    }
    heartsStayFilled();
}

function updateRecipesList(recipes) {
    document.getElementById("allRecipesContainer").innerHTML = "";
    for (let recipe of recipes) {
        renderRecipesList("allRecipesContainer", recipe);
    }
}


