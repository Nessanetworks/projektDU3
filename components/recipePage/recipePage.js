"use strict";

function recipePage(parentID, data) {
    document.getElementById(parentID).innerHTML = "";
    sortPopUpVisible = false;
    popUpVisible = false;
    searchPopUpVisible = false;
    let recipePage = document.createElement("div");
    recipePage.id = "recipePage";
    document.getElementById(parentID).appendChild(recipePage);

    window.scrollTo(0, 0);

    recipePage.innerHTML += `
    <div id="navigationContainerRecipePage">
            <div id="navigationLeft">
                <div id="allRecipes">ALLA RECEPT</div>
            </div>
            <div id="navigationMiddle">
                <div id="navigationIcon"></div>
             </div>
            <div id="navigationRight">
                <div id="logInOrUserName">LOGGA IN</div>
            </div>
        </div>

    <div id="recipeContainer">
        <div id="leftContainer">
            <img id="recipeImg" src="${data.picture}" alt="">
            <span class="heart" value="1">&#x2764;</span>
        </div>
        <div id="rightContainer">
            <h2>${data.name}</h2>
            <div class="rating">
                <span class="star" data-value="1">★</span>
                <span class="star" data-value="2">★</span>
                <span class="star" data-value="3">★</span>
                <span class="star" data-value="4">★</span>
                <span class="star" data-value="5">★</span>
            </div>
            <h3 id="addRating">Lägg till betyg</h3>
            <div id="popUpRating" class="popUpRating">

            </div>
            <div id="timer">
                <img id="timer" src="./media/icons/timer.png" alt="">
                <p>${data.time} min</p>
            </div>
            <div id="ingredients">
                <h4>Ingredienser:</h4>
                <ul>
                ${Object.entries(data.ingredients).map(([ingredient, quantity]) => `<li>${quantity} ${ingredient}</li>`).join('')}
                </ul>
            </div>
            <div id="toDos">
                <h4>Gör såhär:</h4>
                <ol>
                ${data.toDo.map(instruction => `<li>${instruction}</li>`).join('')}
                </ol>
            </div>
        </div>
    </div>
    `;

    if (localStorage.getItem("token")) {
        document.getElementById("logInOrUserName").textContent = `${localStorage.getItem("username").toUpperCase()}`;
    } else {
        document.getElementById("logInOrUserName").textContent = "LOGGA IN";
    }

    document.getElementById("allRecipes").addEventListener("click", () => {
        renderAllRecipesContainer("wrapper");
        renderIngredientSearch("wrapper");
        renderIngredientSort("wrapper");
    });

    let rightContainer = document.getElementById("rightContainer");

    const stars = rightContainer.querySelectorAll('.star');
    stars.forEach(star => {
        /*star.addEventListener('click', () => {
            const ratingValue = parseInt(star.getAttribute('data-value'), 10);
            setRating(ratingValue, rightContainer);
        });*/
    });


    document.getElementById("logInOrUserName").addEventListener("click", function () {
        renderLogInPopUp("wrapper");
    });

    document.getElementById("navigationIcon").addEventListener("click", function () {
        renderLandingPage("wrapper");
    });

    /*document.getElementById("searchRecipes").addEventListener("click", function () {
        renderIngredientSearch("wrapper");
    });*/

    /*document.getElementById("sortRecipes").addEventListener("click", function () {
        renderIngredientSort("wrapper");
    });*/


    const addRatingClick = document.getElementById('addRating');
    const popUpRating = document.getElementById('popUpRating');

    addRatingClick.addEventListener('click', function () {
        popUpRating.innerHTML = '';

        if (popUpRating.querySelector('.popup-content')) {
            popUpRating.style.display = 'block';
            return;
        }

        popUpRating.innerHTML += `
            <div class="exitForRatingButton">
                <button class="exitButton">&times;</button>
            </div>
            <div class="popUpContent">
                <p>Lägg till ditt betyg för:</p> 
                <p><b>${data.name}</b></p>
                <div class="rating">
                    <span class="starsInPopUp" data-value="1">★</span>
                    <span class="starsInPopUp" data-value="2">★</span>
                    <span class="starsInPopUp" data-value="3">★</span>
                    <span class="starsInPopUp" data-value="4">★</span>
                    <span class="starsInPopUp" data-value="5">★</span>
                </div>
                <button id="addRatingButton">Lägg till betyg</button>
            </div>
        `;

        const closeButton = popUpRating.querySelector('.exitForRatingButton');
        const addRatingButton = popUpRating.querySelector('#addRatingButton');

        closeButton.addEventListener('click', function () {
            popUpRating.style.display = 'none';
        });

        addRatingButton.addEventListener("click", function () {

        });

        const popupStars = popUpRating.querySelectorAll('.starsInPopUp');
        popupStars.forEach(popupStar => {
            popupStar.addEventListener('click', () => {
                const ratingValue = parseInt(popupStar.getAttribute('data-value'), 10);
                setRating(ratingValue, popUpRating);
            });
        });

        popUpRating.style.display = 'block';
    });


    const heart = document.querySelector('.heart');


    heart.addEventListener('click', function () {

        heart.classList.toggle('filled');

        if (heart.classList.contains('filled')) {
            heart.innerHTML = '&#x2764;';
        } else {
            heart.innerHTML = '&#x2764;';
        }
    });


}

function setRating(rating, container) {
    const stars = container.querySelectorAll('.starsInPopUp');
    stars.forEach((starsInPopUp, index) => {
        if (index < rating) {
            starsInPopUp.classList.add('filled');
        } else {
            starsInPopUp.classList.remove('filled');
        }
    });
}












