
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
        try {
            const response = await fetch('/api/patchFavorites.php', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: data.id,
                    filled: data.filled,
                    userId: localStorage.getItem("id"),
                }),
            });

            if (response.ok) {
                // Assuming the PHP script returns some data, you can handle it here if needed
                const responseData = await response.json();

                // Update STATE based on the response data
                for (let i = 0; i < STATE.users.length; i++) {
                    let user = STATE.users[i];

                    // Find the user by ID
                    if (user.id === data.id) {
                        // If data.filled is true, add the recipe ID to favorites
                        if (data.filled === true) {
                            // Check if the recipe ID doesn't already exist in favorites
                            if (!user.favorites.includes(data.id)) {
                                user.favorites.push(data.id);
                            }
                        } else {
                            // If data.filled is false, remove the recipe ID from favorites
                            const index = user.favorites.indexOf(data.id);
                            if (index !== -1) {
                                user.favorites.splice(index, 1);
                            }
                        }

                        // Update the STATE object
                        // STATE.users[i] = user;

                        console.log("Updated STATE:", STATE.users);
                        break;
                    }
                }
            } else {
                console.error('Response not OK:', response);
            }
        } catch (error) {
            console.error('Error:', error);
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

