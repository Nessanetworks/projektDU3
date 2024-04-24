"use strict";

function recipePage(parentID, data) {
    document.getElementById(parentID).innerHTML = "";
    let recipePage = document.createElement("div");
    recipePage.id = "recipePage";
    document.getElementById(parentID).appendChild(recipePage);

    navigation("recipePage");

    recipePage.innerHTML += `
    <div id="recipeContainer">
        <div id="leftContainer">
            <img id="recipeImg" src="${data.picture}" alt="">
        </div>
        <div id="rightContainer">
            <h2>${data.name}</h2>
            <div class="rating">
                <span ${onclick = gfg(1)}
                    class="star">★
                </span>
                <span ${onclick = gfg(2)}
                    class="star">★
                </span>
                <span ${onclick = gfg(3)}
                    class="star">★
                </span>
                <span ${onclick = gfg(4)}
                    class="star">★
                </span>
                <span ${onclick = gfg(5)}
                    class="star">★
                </span>
                <h3 id="output">
                    Rating is: 0/5
                </h3>
            </div>
            <h3>Lägg till betyg</h3>
            <div id="timer">
                <img id="timer" src="./media/icons/timer.png" alt="">
                <p>${data.time} min</p>
            </div>
            <div id="ingredients:">
                <h4>Ingredienser</h4>
                <ul>
                ${Object.entries(data.ingredients).map(([ingredient, quantity]) => `<li>${quantity}: ${ingredient}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h4>Gör såhär:</h4>
                <ol>
                ${data.toDo.map(instruction => `<li>${instruction}</li>`).join('')}
                </ol>
            </div>
        </div>
    </div>
    `
    document.getElementById("logInOrUserName").addEventListener("click", function () {
        renderLogInPopUp("wrapper");
    });

    document.getElementById("navigationIcon").addEventListener("click", function () {
        renderLandingPage("wrapper");
    });

    document.getElementById("searchRecipes").addEventListener("click", function () {
        renderIngredientSearch("wrapper");
    });

    document.getElementById("sortRecipes").addEventListener("click", function () {
        renderIngredientSort("wrapper");
    });

    document.getElementById("allRecipes").addEventListener("click", function () {
        renderAllRecipesContainer("wrapper");
    });

}



// script.js

// To access the stars
// let stars =
//     document.querySelector(".star");

// console.log(stars   )

let output =
    document.getElementById("output");

// Funtion to update rating
function gfg(n) {
    let cls = "";
    remove();
    for (let i = 0; i < n; i++) {
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        document.querySelector(".star").className = "star " + cls;
    }
    output.innerText = "Rating is: " + n + "/5";
}

// To remove the pre-applied styling
function remove() {
    let i = 0;
    while (i < 5) {
        document.querySelector(".star").className = "star";
        i++;
    }
}



