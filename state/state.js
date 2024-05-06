let token = localStorage.getItem("token");

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

        console.log("hej", data)
        const response = await fetch(`/api/recipes.php`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            // body: JSON.stringify(data)
        });

        if (response.ok) {
            let resource = await response.json();
            STATE.recipes.push(resource);
        }
    },
    patch: async function (data) {
        data.token = token;
        let options = {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        };
        console.log(options)
        const response = await fetcher(`/api/recipes.php`, options);
        if (response.ok) {
            let resource = await response.json();
            console.log(resource);
            console.log("test", response.json())

        }
        // console.log(response)
        // for (let i = 0; i < STATE.users.length; i++) {

        //     console.log(STATE.users[i]["favorites"])
        // }
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

