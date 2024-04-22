let STATE = {
    recipes: []
}

let State = {
    get: function () {
        const dataClone = JSON.parse(JSON.stringify(STATE[entity]));
        return dataClone;
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

