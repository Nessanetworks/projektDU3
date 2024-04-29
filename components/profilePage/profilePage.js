function renderProfilePage(parentID) {
    document.getElementById(parentID).innerHTML = "";
    let divDom = document.createElement("div");
    divDom.id = "profilePageContainer";
    document.getElementById(parentID).append(divDom);

    navigation("profilePageContainer");

    document.getElementById("sortRecipes").remove();
    document.getElementById("searchRecipes").remove();    

    divDom.innerHTML += `
    <div id="topProfileContainer">
        <h1>${localStorage.getItem("username").toUpperCase()}</h1>
        <button id="profileLogOut">LOGGA UT</button>
    </div>
    <div id="bottomProfileContainer">
        <div id="leftProfileContainer">
            <h3>FAVORITMARKERADE RECEPT</h3>
            <div id="favouriteRecipesContainer"></div>
        </div>
        <div id="rightProfileContainer">
            <h3>SKAPA NYTT RECEPT</h3>
            <div id="createRecipesContainer">
                <div id="firstContainer">
                    <input id="recipeNameInput" type="text" placeholder="RECEPTETS NAMN">
                    <input id="recipeTimeInput" type="number" placeholder="TILLAGNINSTID">
                </div>
                <div id="secondContainer"></div>
                <div id="thirdContainer"></div>
            </div>
        </div>
    `;

    if (localStorage.getItem("token")) {
        document.getElementById("logInOrUserName").textContent = `${localStorage.getItem("username").toUpperCase()}`;
    } else {
        document.getElementById("logInOrUserName").textContent = "LOGGA IN";
    }

    document.getElementById("profileLogOut").addEventListener("click", function () {
        localStorage.removeItem("token");
        renderLandingPage("wrapper");
    })
}