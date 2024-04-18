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
            <div id="logInOrUserName">LOGGA IN</div>
        </div>
    </div>
 
`
}