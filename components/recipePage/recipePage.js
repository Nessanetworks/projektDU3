"use strict";

function recipePage(parentID) {
    document.getElementById(parentID).innerHTML = `
        <div id="recipePage">
            <img id="recipeImg" src="./media/images/chilibowl.webp" alt="">
            <div id="rightContainer">
                <h2>Chili corn carne</h2>
                <stars>
                    <p>++++++</p>
                <stars>
                <h3>Lägg till betyg</h3>
                <div id="timer">
                    <img id="timer" src="./media/icons/timer.png alt="">
                    <p> min</p>
                </div>
                <div id="ingredients:">
                    <h3>Ingredienser</h3>
                    <ul>
                        
                    </ul>
                </div>
                <div>
                    <h3>Gör såhär:</h3>
                    <ol>
                    </ol>
                </div>
            </div>
        </div>
    `
    console.log("Funkar");
}

