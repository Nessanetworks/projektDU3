function renderIngredientSearch(parentID) {
    let inputDom = document.createElement("input");
    inputDom.id = "inputSearchIngredient";
    document.getElementById(parentID).append(inputDom);
}