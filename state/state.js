
console.log("ID FÖR INLOGGADE ANVÄNDAREN:", localStorage.getItem("id"));

let STATE = {
    recipes: [],
    users: []
}

let State = {
    get: function (entity) {
        const dataClone = JSON.parse(JSON.stringify(STATE[entity]));
        return dataClone;
    },
    post: async function (data) {

        const response = await fetch('./api/recipes.php', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json" },
        });
        console.log(JSON.stringify(data));

        if (response.ok) {
            let resource = await response.json();
            STATE.recipes.push(resource);
            renderProfilePage("wrapper");
            newRecipePopUp("profilePageContainer");
        } else {
            errorRecipePopUp("profilePageContainer");
        }
    },

    patch: async function (data) {

        const response = await fetch('./api/patchFavorites.php', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.id,
                userId: localStorage.getItem("id"),
            })
        });


        if (response.ok) {

            data.element.classList.toggle('filled', data.filled);
            data.element.style.color = data.filled ? 'red' : 'rgb(117, 134, 80)';
            data.element.innerHTML = data.filled ? '&#x2764;' : '&#x2764;';

            const userId = parseInt(localStorage.getItem("id"), 10);
            let user = STATE.users.find(user => user.id === userId);
            if (user) {
                if (data.filled) {
                    if (!user.favorites.includes(data.id)) {
                        user.favorites.push(data.id);
                    }
                } else {
                    const index = user.favorites.indexOf(data.id);
                    if (index !== -1) {
                        user.favorites.splice(index, 1);
                    }
                }
                console.log("Updated STATE successfully:", STATE.users);
                if (data.wrapper) {
                    renderProfilePage(data.wrapper);
                }
            }
        } else {
            console.error("Failed to patch favorites");
            data.element.classList.toggle('filled', !data.filled);
            data.element.style.color = !data.filled ? 'red' : 'rgb(117, 134, 80)';
            data.element.innerHTML = !data.filled ? '&#x2764;' : '&#x2764;';

            let divParent = document.getElementById("wrapper");
            let popUpNotLoggedIn = document.getElementById("notLoggedInPopup");

            if (!popUpNotLoggedIn) {
                popUpNotLoggedIn = document.createElement("div");
                popUpNotLoggedIn.id = "notLoggedInPopup";
                popUpNotLoggedIn.classList.add("popUpForFaves");
                divParent.appendChild(popUpNotLoggedIn);
                popUpNotLoggedIn.innerHTML = `
            <p id="needToLogIn">Du måste vara inloggad för att kunna använda den här funktionen!</p>
            <div id="returnLogInBox">
                <button id="goToLogInAgain">LOGGA IN</button>
            </div>
            <button class="exitButton2">X</button>
        `;

                popUpNotLoggedIn.querySelector(".exitButton2").addEventListener('click', function () {
                    popUpNotLoggedIn.remove();
                });

                document.getElementById("goToLogInAgain").addEventListener("click", function () {
                    renderLogInPopUp("wrapper");
                    popUpNotLoggedIn.remove();
                });
            }
            popUpNotLoggedIn.style.display = 'block';
        }
    },

    postRating: async function (data) {
        console.log(data.recipeId);
        try {
            const userId = localStorage.getItem("id");
            const response = await fetch('./api/postRating.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    recipeId: data.recipeId,
                    rating: data.rating
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (response.ok) {
                const responseData = await response.json();
                let resource = await responseData;
                console.log(resource);

                if (responseData.recipe) {
                    let index = STATE.recipes.findIndex(r => r.id == responseData.recipe.id);
                    if (index !== -1) {
                        STATE.recipes[index].rating = responseData.recipe.rating;
                        console.log("Updated Recipe:", STATE.recipes[index]);
                    }
                }
                updateAllRatings();
                //console.log("FUNKAR DET", ratedStars);
                return responseData;
            }



        } catch (error) {
            console.error('Failed to post rating:', error);
        }
    }


}

function heartsStayFilled() {
    let loggedInUserId = localStorage.getItem("id");

    let user = STATE.users.find(user => user.id == loggedInUserId);
    if (user) {
        user.favorites.forEach(dataId => {
            const heartElement = document.getElementById(`heart_${dataId}`);
            if (heartElement) {
                heartElement.classList.add('filled');
                heartElement.style.color = 'red';
                heartElement.innerHTML = '&#x2764;';
            }
        });
    }
}

function updateAllRatings() {
    if (!STATE || !STATE.recipes) {
        console.error('STATE object is not correctly initialized.');
        return;
    }

    STATE.recipes.forEach(recipe => {
        const recipeRatingContainer = document.querySelector(`.rating[data-recipe-id="${recipe.id}"]`);
        if (recipeRatingContainer) {
            setRatings(recipe.rating, recipeRatingContainer);
        }
    });
}
updateAllRatings();





async function fetcher(request, options) {
    return await fetch(request, options);
}

async function runApplication() {
    let options = {
        method: "GET",
        headers: { "Content-type": "application/json" }
    };
    let response1 = await fetcher('./api/recipes.php', options);
    if (response1.ok) {
        let resource1 = await response1.json();
        STATE.recipes = resource1;
    }
    let response2 = await fetcher('./api/usersList.php', options);
    if (response2.ok) {
        let resource2 = await response2.json();
        STATE.users = resource2;
    }
}

async function renderApp() {
    let wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.append(wrapper);

    await runApplication();
    renderLandingPage("wrapper");
}
