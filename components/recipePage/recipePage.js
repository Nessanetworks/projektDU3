"use strict";

function recipePage(parentID) {
    let recipePage = document.createElement("div");
    recipePage.id = "recipePage";

    document.getElementById(parentID).appendChild(recipePage);

    recipePage.innerHTML = `
        <img src="" alt="">
        <div id="recipeText">
            <h2><h2>
            <stars><stars>
            <p>Lägg till betyg</p>
            <div id="timer">
                <img src="" alt="">
            </div>
            <div id="ingredients">
                <h3>Ingredienser</h3>
                <ul>
                
                </ul>
            </div>
            <div>
                <h3>Gör såhär:</h3>
                <ol>
                </ol>
            </div>
        <div>
    `
    console.log("Funkar");
}

