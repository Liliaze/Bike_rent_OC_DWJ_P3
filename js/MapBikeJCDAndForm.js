var JCD = {
    init: function (contractName, divMapId) {
        jcdThis = this;
        jcdThis.first = false;
        //CREATION HTML ET RECUPERATION DES ID
        jcdThis.addHTMLInDiv(divMapId);
        jcdThis.mapDivElt = document.getElementById("mapId");
        jcdThis.divForm = document.getElementById("divForm");
        //AJOUT DE L'OBJET CANVAS
        jcdThis.canvas = Object.create(Canvas);
        jcdThis.canvas.init("canvasId");
        jcdThis.canvas.canvasElt.style.display = "none";
        jcdThis.booking = false;
        //LANCEMENT REQUETE JCD ET TRAITEMENT DES DONNEES
        jcdThis.currentStation = null;
        jcdThis.bookingStation = null;
        jcdThis.contractName = contractName;
        apiJCD.getContractInfo(contractName);
        //AJOUT EVENEMENTIEL
        window.addEventListener("resize", jcdThis.resizeWindow);
        submitForm.addEventListener("click", jcdThis.clickOnSubmit);
        jcdThis.displayBooking();
    },
    /*
    ajout de l'HTML pour la map liée au contractName et le formulaire dans la div demandée.
     */
    addHTMLInDiv: function (divMapId) {
        document.getElementById(divMapId).innerHTML +=
            '    <div id="mapId">\n' +
            '    </div>\n' +
            '    <div id="divForm">\n' +
            '        <form id="form"><fieldset id="fieldsetForm">\n' +
            '            <legend>Détails de la station...</legend>\n' +
            '            <p id="statusP">\n' +
            '                Status\n' +
            '            </p>\n' +
            '            <p id="nameP">\n' +
            '                Station X\n' +
            '            </p>\n' +
            '            <p id="addressP">\n' +
            '                Merci de choisir une station\n' +
            '            </p>\n' +
            '            <p id="nbStandsP">\n' +
            '               \n' +
            '            </p>\n' +
            '            <p id="nbBikesP">\n' +
            '                \n' +
            '            </p>\n' +
            '            <p class="input">\n' +
            '                <label for="name">Nom :</label>\n' +
            '                <input type="text" name="name" id="nameInput" placeholder="nom" value="nom" autofocus required>\n' +
            '            </p>\n' +
            '            <p class="input">\n' +
            '                <label for="firstName">Prénom :</label>\n' +
            '                <input type="text" name="firstName" id="firstNameInput" placeholder="prénom" value="prénom" required>\n' +
            '            </p>\n' +
            '            <input id="submitForm" type="submit" value="Réserver" />\n' +
            '            <div id="canvasId">\n' +
            '            </div>\n' +
            '        </fieldset></form>\n' +
            '    </div>';
        jcdThis.createButtonConfirm();
    },

    createButtonConfirm: function () {
        var buttonConfirm = document.createElement("input");
        buttonConfirm.type = "submit";
        buttonConfirm.id = "buttonConfirm";
        buttonConfirm.value = "Confirmer la réservation";
        fieldsetForm.appendChild(buttonConfirm);
        buttonConfirm.addEventListener("click", jcdThis.clickOnSubmitSecond);
        buttonConfirm.style.display = "none";
    },
    /*
    ============================== REQUETE AUPRES DE JC DECAUX ==============================
    */
    getContractInfo: function (contractName) {
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=" + contractName + "&apiKey=27ee320d96a32823835e7c985c3f2d6b5c4fc37d", jcdThis.dataProcessing);
    },
    /*
    ============================ TRAITEMENT DES DONNEES DE LA REQUETE / APPEL CREATION MAP ET MARQUEURS ============================
     */
    dataProcessing: function (reponse) {
        jcdThis.createIconesLeaflet();
        jcdThis.createMapLeaflet(reponse[0].position.lat, reponse[0].position.lng);
        reponse.forEach(function (element) {
            var station = Object.create(BikeStation);
            station.init(element);
            jcdThis.displayMarker(station);
        });
    },
    /*
    ============================== MAP LEAFLET INSTANCIATION ====================================
    */
    createIconesLeaflet: function () {
        jcdThis.iconGreen = L.icon({
            iconUrl: './img/bikeIconGreen.png',
            iconSize: [38, 60],
            iconAnchor: [22, 59],
            popupAnchor: [-3, -59],
            shadowUrl: './img/bikeIconShadow.png',
            shadowSize: [68, 60],
            shadowAnchor: [22, 59]
        });
        jcdThis.iconRed = L.icon({
            iconUrl: './img/bikeIconRed.png',
            iconSize: [38, 60],
            iconAnchor: [22, 59],
            popupAnchor: [-3, -59],
            shadowUrl: './img/bikeIconShadow.png',
            shadowSize: [68, 60],
            shadowAnchor: [22, 59]
        });
        jcdThis.iconOrange = L.icon({
            iconUrl: './img/bikeIconOrange.png',
            iconSize: [38, 60],
            iconAnchor: [22, 59],
            popupAnchor: [-3, -59],
            shadowUrl: './img/bikeIconShadow.png',
            shadowSize: [68, 60],
            shadowAnchor: [22, 59]
        });
    },
    createMapLeaflet: function (lat, lng) {
        jcdThis.mapId = L.map('mapId').setView([45.764043, 4.835659], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 24,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiZGlhbmFib3VkeSIsImEiOiJjam5jNTJnY3kydDI1M2tydW9hY3M3Y2UwIn0.-_lVVTPD35gJXJg-jUZ9DA'
        }).addTo(jcdThis.mapId);
    },
    displayMarker: function(station) {
        if (station.status === "OPEN" && station.availableBikes > 0)
            var marker = L.marker([station.positionLat, station.positionLng],{icon: jcdThis.iconGreen}).addTo(jcdThis.mapId);
        else if (station.status === "OPEN")
            var marker = L.marker([station.positionLat, station.positionLng],{icon: jcdThis.iconOrange}).addTo(jcdThis.mapId);
        else
            var marker = L.marker([station.positionLat, station.positionLng],{icon: jcdThis.iconRed}).addTo(jcdThis.mapId);
        marker.bindPopup("<b>"+station.name+"</b>").openPopup();
        marker.on('click', function (){jcdThis.clickOnMarker(station);});
    },
    /*
    ================================ FONCTIONS EVENEMENTIELLES ============================
     */
    clickOnMarker: function(station) {
        if (!jcdThis.first)
            jcdThis.divForm.style.display = "block";
        jcdThis.first = true;
        jcdThis.currentStation = station;
        statusP.textContent = station.status;
        statusP.style.color = station.status === "OPEN" ? "green" : "red";
        nameP.textContent = station.name;
        addressP.textContent = "Adresse : " + station.address;
        nbStandsP.textContent = station.nbBikesStands > 1 ? station.nbBikesStands + " places" : station.nbBikesStands + "place" ;
        nbBikesP.textContent = station.availableBikes > 1 ? station.availableBikes + " vélos disponibles" : station.availableBikes + " vélo disponible";
        nbBikesP.style.color = station.availableBikes > 0 ? "green" : "orange";
        jcdThis.resizeWindow();
    },
    clickOnSubmit: function (event) {
        event.preventDefault();
        console.log("CLISKC CLISCK = " + this.id + "!!!!!");
        if (jcdThis.currentStation.status === "OPEN" && jcdThis.currentStation.availableBikes > 0) {
            jcdThis.canvas.canvasElt.style.display = "block";
            buttonConfirm.style.display = "block";
            submitForm.style.display = "none";
        }
        else {
            alert("Réservation à cette station impossible, please choose an other\nSTATUS = " + jcdThis.currentStation.status + ", pas de vélo disponible" );
        }
    },
    clickOnSubmitSecond: function (event) {
        if(sessionStorage.getItem('booking') === 'true')
            jcdThis.cancelPreviousBooking();
        event.preventDefault();
        jcdThis.bookingInfo();
        submitForm.style.display = "block";
        jcdThis.canvas.canvasElt.style.display = "none";
        buttonConfirm.style.display = "none";
        jcdThis.displayBooking();

    },
    bookingInfo: function() {
        jcdThis.bookingStation = jcdThis.currentStation;
        jcdThis.booking = true;
        sessionStorage.setItem('booking', 'true');
        sessionStorage.setItem('nameStation', jcdThis.bookingStation.name);
        sessionStorage.setItem('timeToBooking', '1200');
        localStorage.setItem('clientName', nameInput.value);
        localStorage.setItem('clientFirstName', firstNameInput.value);
    },
    displayBooking: function() {
        if (sessionStorage.getItem('booking') === 'true'){
            var bookingText1 = document.createElement("p");
            bookingText1.id = "bookingText1";
            var bookingText2 = document.createElement("p");
            bookingText2.id = "bookingText2";
            finalText.appendChild(bookingText1);
            finalText.appendChild(bookingText2);
            jcdThis.intervalAnimTextFinal = setInterval('jcdThis.updateFinalText()', 1e3);
        }
        nameInput.value = localStorage.getItem('clientName');
        firstNameInput.value = localStorage.getItem('clientFirstName');
    },
    updateFinalText: function() {
        var time = sessionStorage.getItem('timeToBooking');
        time -= 1;
        sessionStorage.setItem('timeToBooking', time);
        if (time > 0) {
            bookingText1.textContent = "Vélo réservé à la station " + sessionStorage.getItem('nameStation') + " par " + localStorage.getItem('clientFirstName') + " " + localStorage.getItem('clientName');
            bookingText2.textContent = "Temps restant : " + Math.trunc(time / 60) + " min " + time % 60 + "s";
        }
        else {
            jcdThis.cancelPreviousBooking();
        }
    },
    cancelPreviousBooking: function() {
        clearInterval(jcdThis.intervalAnimTextFinal);
        finalText.removeChild(bookingText1);
        finalText.removeChild(bookingText2);
        sessionStorage.setItem('booking', 'false');
        sessionStorage.removeItem('timeToBooking');
        jcdThis.bookingStation = null;
    },
    resizeWindow: function() {
        if (!jcdThis.first)
            return;
        var screenWidth = (document.body.clientWidth);
        var screenHeight = (document.body.clientHeight);
        if (screenWidth > 1024) {
            jcdThis.divForm.style.width = "35%";
            jcdThis.mapDivElt.style.width = "63%";
        }
        else {
            jcdThis.divForm.style.width = "100%";
            jcdThis.mapDivElt.style.width = "100%";
        }
    }
};