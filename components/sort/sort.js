function renderIngredientSearch(parentID) {
    let divDom = document.createElement("div");
    divDom.id = "divSearchIngredient";
    document.getElementById(parentID).append(divDom);

    divDom.innerHTML = `
    <input type="text" id="inputSearchIngredient" class="hide" placeholder="SÖK EFTER INGREDIENS...">
    `;
}