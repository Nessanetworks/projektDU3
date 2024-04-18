function renderLandingPage(parentID) {
    let landingPageContainer = document.createElement("div");
    landingPageContainer.id = "landingPageContainer";
    document.getElementById(parentID).append(landingPageContainer);

    landingPageContainer.innerHTML = `
   <div id="landingPageTopContainer">
        <div id="landingPageTitle">
            <h3>STUDENTSKAFFERIET</h3>
            <div id="landingPageIcon"><img src="./media/landingPageImg/Icon.PNG"></div>
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
                <p>Här hittar du ett stort utbud av enkla,<br> snabba och billiga som passar<br> utmärkt för studenter!</p>
                <button id="landingPageButton">GÅ TILL ALLA RECEPT</button>
            </div>
        
        </div>
        <div id="landingPageRight"></div>
    </div>
   `;

    document.getElementById("landingPageButton").addEventListener("click", function () {
        renderAllRecipesContainer("wrapper");
    });
}