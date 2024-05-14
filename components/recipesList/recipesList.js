
function renderRecipesList(parentID, data) {
    divDom = document.createElement("div");
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
                <div class="rating" data-recipe-id="${data.id}">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
            </div>
        </div>
    </div>
`;
    updateAllRatings();

    divDom.addEventListener("click", () => {
        recipePage("wrapper", data);
    })


    const hearts = divDom.querySelector('.eventHeart');
    hearts.addEventListener('click', function (event) {
        event.stopPropagation();
        const isFilled = this.classList.contains('filled');
        State.patch({
            id: data.id,
            filled: !isFilled,
            element: this
        });
    });

    /*const hearts = divDom.querySelector('.eventHeart');
    hearts.addEventListener('click', function (event) {
        event.stopPropagation();
        this.classList.toggle('filled');
        const id = data.id;

        if (this.classList.add('filled')) {
            this.innerHTML = '&#x2764;';
            State.patch({ id: id });
            console.log("true")
        } else {
            this.classList.remove("filled");
            State.patch({ id: id });
            console.log("false")
        }
    });*/
}





