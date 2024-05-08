
console.log("ID FÖR INLOGGADE ANVÄNDAREN:", localStorage.getItem("id"));

let STATE = {
    recipes: [],
    users: []
}

let State = {
    get: function () {
        const dataClone = JSON.parse(JSON.stringify(STATE.recipes));
        return dataClone;
    },
    post: async function (data) {

        const response = await fetch(`/api/recipes.php`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json" },
        });

        if (response.ok) {
            let resource = await response.json();
            STATE.recipes.push(resource);
            renderProfilePage("wrapper");
            newRecipePopUp("profilePageContainer");
        }
    },

    patch: async function (data) {

        const response = await fetch('/api/patchFavorites.php', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.id,
                filled: data.filled,
                userId: localStorage.getItem("id"),
            })
        });


        for (let i = 0; i < STATE.users.length; i++) {
            if (STATE.users[i].id === localStorage.getItem("id")) {
                let userFavoritesArray = STATE.users[i].favorites;
                // If data.filled is true, add the recipe ID to favorites
                if (data.filled === true) {
                    if (!userFavoritesArray.includes(data.id)) {
                        userFavoritesArray.push(data.id);
                    }
                } else {
                    // If data.filled is false, remove the recipe ID from favorites
                    const index = userFavoritesArray.indexOf(data.id);
                    if (index !== -1) {
                        userFavoritesArray.splice(index, 1);
                    }
                }
                // Update the STATE object and break out of the loop
                STATE.users[i].favorites = userFavoritesArray; // Update favorites array
                console.log("Updated STATE:", STATE.users);
                break; // Exit loop after updating user
            }
        }
    }
}

function heartsStayFilled() {
    let loggedInUserId = localStorage.getItem("id");

    let user = STATE.users.find(user => user.id == loggedInUserId);
    console.log(user);
    if (user) {
        user.favorites.forEach(dataId => {
            console.log(dataId);
            const heartElement = document.getElementById(`heart_${dataId}`);
            if (heartElement) {
                heartElement.style.color = 'red';
                heartElement.innerHTML = '&#x2764;';
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', heartsStayFilled, console.log("YES?", STATE));



async function fetcher(request, options) {
    return await fetch(request, options);
}

async function runApplication() {
    let options = {
        method: "GET",
        headers: { "Content-type": "application/json" }
    };
    let response1 = await fetcher(`/api/recipes.php`, options);
    if (response1.ok) {
        let resource1 = await response1.json();
        STATE.recipes = resource1;
    }
    let response2 = await fetcher(`/api/usersList.php`, options);
    if (response2.ok) {
        let resource2 = await response2.json();
        STATE.users = resource2;
    }
    console.log(STATE.users);
}

async function renderApp() {
    let wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.append(wrapper);

    await runApplication();
    renderLandingPage("wrapper");
}

