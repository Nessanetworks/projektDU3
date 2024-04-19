function renderLandingPage(parentID) {
    document.getElementById(parentID).innerHTML = "";
    let landingPageContainer = document.createElement("div");
    landingPageContainer.id = "landingPageContainer";
    document.getElementById(parentID).append(landingPageContainer);

    landingPageContainer.innerHTML = `
    <div id="landingPageTopContainer">
        <div id="landingPageTitle">
            <h3>STUDENTSKAFFERIET</h3>
            <div id="landingPageIcon"><img src="./media/icons/iconSK.png"></div>
        </div>
        <div id="landingPageLogIn">LOGGA IN</div>
    </div>
    <div id="landingPageBottomContainer">
        <div id="landingPageLeft">
            <div id="htre">
                <h3>ÄR DU</h3>
            </div>
            <div id="slogan">
                <h1>HUNGRIG?</h1>
                <p>Här hittar du ett stort utbud av enkla,<br> snabba och billiga recept som passar<br> utmärkt för studenter!</p>
                <button id="landingPageButton">GÅ TILL ALLA RECEPT</button>
            </div>
        </div>
        <div id="landingPageRight"></div>
    </div>
   `;

    document.getElementById("landingPageLogIn").addEventListener("click", function () {
        renderAllRecipesContainer("wrapper");
        renderLogInPopUp("wrapper");
    });

    document.getElementById("landingPageButton").addEventListener("click", function () {
        renderAllRecipesContainer("wrapper");
    });
}