function renderLandingPage (parentID) {
   let landingPageContainer = document.createElement("div");
   landingPageContainer.id = "landingPageContainer";
   document.getElementById(parentID).append(landingPageContainer);

   landingPageContainer.innerHTML = `
   <div id="landingPageTopContainer">
        <div id="landingPageTitle">
            <h3>STUDENTSKAFFERIET</h3>
        </div>
        <div id="landingPageIcon"></div>
        <div id="landingPageLogIn>LOGGA IN</div>
    </div>
    <div id="landingPageBottomContainer">
        <div id="landingPageLeft">
            <h2>ÄR DU HUNGRIG?</h2>
            <p>Här hittar du ett stort utbud av enkla, snabba och billiga som passar utmärkt för studenter!</p>
            <button id="landingPageButton">GÅ TILL ALLA RECEPT</button>
        </div>
        <div id="landingPageRight"></div>
    </div>
   `;
}