let STATE = {
    recipes: []
}

function renderApp() {
    let wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.append(wrapper);

    renderLandingPage("wrapper");
}