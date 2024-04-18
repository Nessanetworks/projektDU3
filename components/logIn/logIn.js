function renderLogInPopUp (parentID) {
    let divDom = document.createElement("div")
    divDom.id = "popUpContainer";
    document.getElementById(parentID).append(divDom);
    divDom.innerHTML = `
    <div id="popUpBox">
        <div id="closePopUp">X</div>
        <div id="popUpIcon"></div>
        <p id="logInParagraph">LOGGA IN</p>
        <input id="userNameLogIn" type="text" placeholder ="Användarnamn">
        <input id="passwordLogIn" type="password" placeholder ="Lösenord">
        <button id="logInButton">LOGGA IN</button>
        <p id="noAccountParagraph">Har du inget konto?</p>
        <p id="createAccountParagraph">Skapa konto här</p>
    </div>
    `;

    document.getElementById("closePopUp").addEventListener("click", function() {
        divDom.remove();
    })
}