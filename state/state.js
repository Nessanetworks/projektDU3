let STATE = {
    recipes: []
}

async function fetcher(request, options) {
    return await fetch(request, options);
}

async function runApplication() {
    let options = {
        method: "GET",
        headers: { "Content-type": "application/json" }
    };
    let response = await fetcher(`/api/recipes.php?token=6671cb1c4aeeb7b2bf6d7474b28296b199bdd568`, options);
    if (response.ok) {
        let resource = await response.json();
        STATE.recipes = resource;
    }
    console.log(STATE);
}

async function renderApp() {
    let wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.append(wrapper);

    await runApplication();
    renderLandingPage("wrapper");
}

