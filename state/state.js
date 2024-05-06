let STATE = {
    recipes: []
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
            console.log("ok");
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
    let response = await fetcher(`/api/recipes.php`, options);
    if (response.ok) {
        let resource = await response.json();
        STATE.recipes = resource;
    }
}

async function renderApp() {
    let wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.append(wrapper);

    await runApplication();
    renderLandingPage("wrapper");
}

