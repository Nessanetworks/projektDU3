function renderLogInPopUp(parentID) {
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

    document.getElementById("closePopUp").addEventListener("click", function () {
        divDom.remove();
    })

    document.getElementById("createAccountParagraph").addEventListener("click", function () {
        renderCreateAccountPopUp("wrapper");
    })
}

function renderCreateAccountPopUp(parentID) {
    document.getElementById("popUpContainer").innerHTML = "";
    document.getElementById("popUpContainer").innerHTML = `
    <div id="popUpBox">
        <div id="closePopUp">X</div>
        <div id="popUpIcon"></div>
        <p id="createAccountTitle">SKAPA KONTO</p>
        <input id="createUserName" type="text" placeholder ="Användarnamn">
        <input id="createPassword" type="password" placeholder ="Lösenord">
        <input id="confirmPassword" type="password" placeholder ="Bekräfta lösenord">
        <button id="createAccountButton">SKAPA KONTO</button>
        <p id="alreadyUserParagraph">Har du redan ett konto?</p>
        <p id="goToLogInParagraph">Logga in här</p>
    </div>
    `;

    document.getElementById("closePopUp").addEventListener("click", function () {
        document.getElementById("popUpContainer").remove();
    })

    document.getElementById("goToLogInParagraph").addEventListener("click", function () {
        document.getElementById("popUpContainer").remove();
        renderLogInPopUp("wrapper");
    })
}