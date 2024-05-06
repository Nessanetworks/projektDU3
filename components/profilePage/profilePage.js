let instructionsCounter = 2;
let ingredientsCounter = 2;

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
                <div id="secondContainer">
                    <div id="ingredientBox">
                        <div class="ingredientsInputContainer">
                            <input id="ingredientInput1" class="ingredientInput" type="text" placeholder="INGREDIENS 1">
                            <input id="measureInput1" class="measureInput" type="text" placeholder="MÅTT 1">
                        </div>
                        <div class="ingredientsInputContainer">
                            <input id="ingredientInput2" class="ingredientInput" type="text" placeholder="INGREDIENS 2">
                            <input id="measureInput2" class="measureInput" type="text" placeholder="MÅTT 2">
                        </div>
                    </div>
                    <div id="addMoreIngredients">+ LÄGG TILL FLER</div>
                </div>
                <div id="thirdContainer">
                    <div id="instructionBox">
                        <input id="instruction1" class="instructionInput" type="text" placeholder="INSTRUKTION 1">
                        <input id="instruction2" class="instructionInput" type="text" placeholder="INSTRUKTION 2">
                    </div>
                    <div id="addMoreInstructions">+ LÄGG TILL FLER</div>
                </div>
            </div>
            <div id="rightBottomContainer">
                <div id="uploadPicture">
                    LADDA UPP BILD
                    <input type="file" id="fileInput" accept="image/*" style="display: none;">
                </div>
                <button id="createNewRecipeButton">SKAPA</button>
            </div>
        </div>
    `;

    document.getElementById("uploadPicture").addEventListener("click", function () {
        document.getElementById("fileInput").click();
    });

    document.getElementById("fileInput").addEventListener("change", function () {
        const fileName = this.files[0].name;

        if (fileName) {
            document.getElementById("uploadPicture").textContent = fileName;
            window.selectedFileName = fileName;
        }
    });

    document.getElementById("addMoreIngredients").addEventListener("click", function () {
        renderMoreIngredients("ingredientBox");
    })

    document.getElementById("addMoreInstructions").addEventListener("click", function () {
        renderMoreInstructions("instructionBox");
    })

    if (localStorage.getItem("token")) {
        document.getElementById("logInOrUserName").textContent = `${localStorage.getItem("username").toUpperCase()}`;
    } else {
        document.getElementById("logInOrUserName").textContent = "LOGGA IN";
    }

    document.getElementById("allRecipes").addEventListener("click", function () {
        instructionsCounter = 2;
        ingredientsCounter = 2;
        renderAllRecipesContainer("wrapper");
    })

    document.getElementById("navigationIcon").addEventListener("click", function () {
        instructionsCounter = 2;
        ingredientsCounter = 2;
        renderLandingPage("wrapper");
    })

    document.getElementById("profileLogOut").addEventListener("click", function () {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        instructionsCounter = 2;
        ingredientsCounter = 2;
        renderLandingPage("wrapper");
    })

    document.getElementById("createNewRecipeButton").addEventListener("click", function () {
        const recipeName = document.getElementById("recipeNameInput").value;
        const cookingTime = document.getElementById("recipeTimeInput").value;
        const ingredients = getAllIngredients();
        const instructions = getAllInstructions();



        State.post({ rating: 0, time: cookingTime, name: recipeName, ingredients: ingredients, toDo: instructions, picture: window.selectedFileName });
    });


    const user = STATE.users.find(user => user.id == localStorage.getItem("id"));
    if (user) {
        const favorites = user.favorites;
        for (const recipeId of favorites) {
            const recipe = STATE.recipes.find(recipe => recipe.id === recipeId);
            if (recipe) {
                renderFavouriteRecipe(recipe);
            }
        }
    }
}

function renderFavouriteRecipe(recipe) {
    let div = document.createElement("div");
    div.classList.add("favouriteRecipesInstance");
    document.getElementById("favouriteRecipesContainer").append(div);
    div.innerHTML = `
    <div id="favouriteRecipesListContainer">
        <div id="favouriteRecipesListImageContainer">
            <div id="favouriteRecipeImageBox">
                <span class="heartsAll" value="1">&#x2764;</span>
                <img class="recipeImage" src=${recipe.picture}>
            </div>
        </div>
        <div id="favouriteRecipesTextContainer">
            <div id="favouriteRecipeTextBox">
                <p id="favouriteRecipeListName" class="recipeNameClickable">${recipe.name.toUpperCase()}</p>
                <div id="favouriteRecipeTimeContainer">
                    <div id="favouriteTimerImage"></div>
                    <p id="favouriteRecipeListTime">${recipe.time} min</p>
                </div>
            </div>
        </div>
    </div>
`;
    div.addEventListener("click", function () {
        recipePage("wrapper", recipe);
    })
}

function renderMoreIngredients(parentID) {
    let divDom = document.createElement("div");
    divDom.classList.add("ingredientsInputContainer");
    document.getElementById(parentID).append(divDom);
    divDom.innerHTML = `
    <input id='ingredientInput${ingredientsCounter + 1}' class="ingredientInput" type="text" placeholder='INGREDIENS ${ingredientsCounter + 1}'>
    <input id='measureInput${ingredientsCounter + 1}' class="measureInput" type="text" placeholder='MÅTT ${ingredientsCounter + 1}'>
    `;
    ingredientsCounter++;

    return divDom.id
}

function renderMoreInstructions(parentID) {
    let parentElement = document.getElementById(parentID);

    let inputElement = document.createElement("input");
    inputElement.className = "instructionInput";
    inputElement.id = `instruction${instructionsCounter + 1}`;
    inputElement.type = "text";
    inputElement.placeholder = `INSTRUKTION ${instructionsCounter + 1}`;

    parentElement.appendChild(inputElement);
    instructionsCounter++;

    return inputElement.id
}

function getAllIngredients() {
    let ingredients = {};
    for (let i = 0; i < ingredientsCounter; i++) {
        let ingredientInput = document.getElementById(`ingredientInput${i + 1}`).value;
        let measureInput = document.getElementById(`measureInput${i + 1}`).value;
        ingredients[ingredientInput] = measureInput;
    }
    return ingredients;
}

function getAllInstructions() {
    let instructions = [];
    for (let i = 0; i < instructionsCounter; i++) {
        let instructionInput = document.getElementById(`instruction${i + 1}`).value;
        instructions.push(instructionInput);
    }
    return instructions;
}

function newRecipePopUp(parentID) {
    let div = document.createElement("div");
    div.id = "newRecipePopUpContainer";
    document.getElementById(parentID).append(div);
    div.innerHTML = `
    <div id="newRecipePopUpBox">
        <p>${localStorage.getItem("username").toUpperCase()}, ditt recept är nu tillagt!</p>
        <div id="closeNewRecipe">X</div>
    </div>
    `;
    document.getElementById("closeNewRecipe").addEventListener("click", function () {
        div.remove();
    })
}
