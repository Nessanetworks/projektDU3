let popUpVisible = false;

function renderLogInPopUp(parentID) {
    if (!popUpVisible) {
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
            popUpVisible = false;
        });

        document.getElementById("createAccountParagraph").addEventListener("click", function () {
            renderCreateAccountPopUp("wrapper");
            popUpVisible = true;
        });

        popUpVisible = true;

        document.getElementById("logInButton").addEventListener("click", logIn);
    }
}

async function logIn() {
    let userName = document.getElementById("userNameLogIn").value;
    let userPassword = document.getElementById("passwordLogIn").value;

    let logInData = {
        username: userName,
        password: userPassword
    };

    let options = {
        method: "POST",
        body: JSON.stringify(logInData),
        headers: { "Content-type": "application/json" }
    };

    let response = await fetcher("/api/login.php", options);
    if (response.ok) {
        let resource = await response.json();
        localStorage.setItem("token", resource.token);
        localStorage.setItem("username", userName);
        renderProfilePage("wrapper");
    }
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
        popUpVisible = false;
    });

    document.getElementById("goToLogInParagraph").addEventListener("click", function () {
        document.getElementById("popUpContainer").remove();
        popUpVisible = false;
        renderLogInPopUp("wrapper");
    });

    document.getElementById("createAccountButton").addEventListener("click", createUser);
}

async function createUser() {
    let userName = document.getElementById("createUserName").value;
    let userPassword = document.getElementById("createPassword").value;
    let userConfirmPassword = document.getElementById("confirmPassword").value;

    if (userPassword === userConfirmPassword) {
        let userData = {
            username: userName,
            password: userPassword
        };

        let options = {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-type": "application/json" }
        };

        let response = await fetcher("/api/users.php", options);
        if (response.ok) {
            popUpVisible = false;
            document.getElementById("popUpContainer").remove();
            renderLogInPopUp("wrapper");
        }
    }
}


