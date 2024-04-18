function renderRecipesList (parentID) {
    let divDom = document.createElement("div");
    divDom.classList.add("recipesInstance");
    document.getElementById(parentID).append(divDom);
}