function navigation(parentID) {
    document.getElementById(parentID).innerHTML = `
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
            <div id="logInOrUserName"></div>
        </div>
    </div>
    `;

    if (localStorage.getItem("token")) {
        document.getElementById("logInOrUserName").textContent = `${localStorage.getItem("username").toUpperCase()}`;
    } else {
        document.getElementById("logInOrUserName").textContent = "LOGGA IN";
    }
}