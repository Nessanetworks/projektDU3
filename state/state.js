
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
        for (let i = 0; i < STATE.users.length; i++) {
            if (STATE.users[i].id === localStorage.getItem("id")) {
                let userFavoritesArray = STATE.users[i].favorites;
                // If data.filled is true, add the recipe ID to favorites
                if (data.filled === true) {
                    if (!userFavoritesArray.includes(data.id)) {
                        userFavoritesArray.push(data.id);
                        const hearts = document.getElementById('heart_' + data.id);
                        if (hearts) {
                            hearts.classList.add('heartsAll', 'filled');
                            hearts.style.color = 'red'; // Ensure the heart turns red
                        }
                    }
                } else {
                    // If data.filled is false, remove the recipe ID from favorites
                    const index = userFavoritesArray.indexOf(data.id);
                    if (index !== -1) {
                        userFavoritesArray.splice(index, 1);
                        const hearts = document.getElementById('heart_' + data.id);
                        if (hearts) {
                            hearts.classList.remove('heartsAll', 'filled');
                            hearts.style.color = ''; // Reset color
                        }
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

