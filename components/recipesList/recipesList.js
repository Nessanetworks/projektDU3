function renderRecipesList(parentID, data) {
    let divDom = document.createElement("div");
    divDom.classList.add("recipesInstance");
    document.getElementById(parentID).append(divDom);

    divDom.innerHTML = `
    <div id="recipesListContainer">
        <div id="recipesListImageContainer">
            <div id="recipeImageBox">
                <span id='heart_${data.id}' class="heartsAll eventHeart" value="1">&#x2764;</span>
                <img class="recipeImage" src=${data.picture}>
            </div>
        </div>
        <div id="recipesTextContainer">
            <div id="recipeTextBox">
                <p id="recipeListName" class="recipeNameClickable">${data.name.toUpperCase()}</p>
                <div id="recipeTimeContainer">
                    <div id="timerImage"></div>
                    <p id="recipeListTime">${data.time} min</p>
                </div>
            </div>
        </div>
    </div>
`;
    /*const recipeNameClickable = divDom.querySelector('.recipeNameClickable');

    recipeNameClickable.addEventListener('click', (event) => {
        event.stopPropagation();
        recipePage('wrapper', data);
    });*/

    divDom.addEventListener("click", () => {
        recipePage("wrapper", data);
    })


    const hearts = divDom.querySelector('.eventHeart');
    hearts.addEventListener('click', function (event) {
        event.stopPropagation();
        this.classList.toggle('filled');
        const id = data.id;

        if (this.classList.contains('filled')) {
            this.innerHTML = '&#x2764;';
            State.patch({ id: id, filled: true });
            console.log("true")
        } else {
            State.patch({ id: id, filled: false });
            console.log("false")
        }
    });
}




