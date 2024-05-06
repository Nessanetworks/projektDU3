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
                <div id="uploadPicture">LADDA UPP BILD</div>
                <button id="createNewRecipeButton">SKAPA</button>
            </div>
        </div>
    `;

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
        const ingredients = getAllIngredients(); //get all ingredients --> values
        const instructions = getAllInstructions(); //get all instructions --> values

        State.post({ rating: 0, time: cookingTime, name: recipeName, ingredients: ingredients, toDo: instructions });
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

function renderFavouriteRecipe (recipe) {
    let div = document.createElement("div");
    document.getElementById("favouriteRecipesContainer").append(div);
    div.textContent = recipe.name;
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
    let ingredients = [];
    for (let i = 0; i < ingredientsCounter; i++) {
        let ingredientInput = document.getElementById(`ingredientInput${i + 1}`).value;
        let measureInput = document.getElementById(`measureInput${i + 1}`).value;
        ingredients.push({ ingredient: ingredientInput, measure: measureInput });
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
