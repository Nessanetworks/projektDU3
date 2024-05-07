let token = localStorage.getItem("token");

console.log("STORRREEE", localStorage.getItem("token"));
//ef13c59c8e8dc1ea137b6b2b4aeea899
//b50e45a7450e13fc3a95399ce8ed7189

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
            const response = await fetch('/api/users.php', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: data.id,
                    token: localStorage.getItem("token"),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update favorites');
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

