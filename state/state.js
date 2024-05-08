
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

        console.log(JSON.stringify(data));

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
        } else {
            errorRecipePopUp("profilePageContainer");
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

        if (response.ok) {
            for (let i = 0; i < STATE.users.length; i++) {
                if (STATE.users[i].id === localStorage.getItem("id")) {
                    let userFavoritesArray = STATE.users[i].favorites;
                    if (data.filled === true) {
                        if (!userFavoritesArray.includes(data.id)) {
                            userFavoritesArray.push(data.id);
                        }
                    } else {
                        const index = userFavoritesArray.indexOf(data.id);
                        if (index !== -1) {
                            userFavoritesArray.splice(index, 1);
                        }
                    }
                    STATE.users[i].favorites = userFavoritesArray;
                    console.log("Updated STATE:", STATE.users);
                    break;
                }
            }

        }
    }
}

function heartsStayFilled() {
    let loggedInUserId = localStorage.getItem("id");

    let user = STATE.users.find(user => user.id == loggedInUserId);
    //console.log(user);
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
}

async function renderApp() {
    let wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.append(wrapper);

    await runApplication();
    renderLandingPage("wrapper");
}


