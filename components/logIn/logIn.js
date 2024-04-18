function renderLogInPopUp (parentID) {
    let divDom = document.createElement("div")
    divDom.id = "popUpContainer";
    document.getElementById(parentID).append(divDom);
    divDom.innerHTML = `
    <div id="popUpBox">
        <div id="popUpIcon"></div>
        <p>LOGGA IN</p>
        <input id="userNameLogIn" type="text" placeholder ="Användarnamn">
        <input id="passwordLogIn" type="password" placeholder ="Lösenord">
        <button id="logInButton">LOGGA IN</button>
        <p>Har du inget konto?</p>
        <p>Skapa konto här</p>
    </div>
    `;
}