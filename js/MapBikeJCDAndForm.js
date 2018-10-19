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
        //LANCEMENT REQUETE JCD ET TRAITEMENT DES DONNEES
        jcdThis.currentStation = null;
        jcdThis.contractName = contractName;
        apiJCD.getContractInfo(contractName);
        //AJOUT EVENEMENTIEL
        window.addEventListener("resize", jcdThis.resizeWindow);
        submitForm.addEventListener("click", jcdThis.clickOnSubmit);
    },
    /*
    ajout de l'HTML pour la map liée au contractName et le formulaire dans la div demandée.
     */
    addHTMLInDiv: function (divMapId) {
        document.getElementById(divMapId).innerHTML +=
            '    <div id="mapId">\n' +
            '    </div>\n' +
            '    <div id="divForm">\n' +
            '        <i class="fas fa-map-marker-alt"></i>\n' +
            '        <form id="form"><fieldset>\n' +
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
        jcdThis.mapId = L.map('mapId').setView([lat, lng], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
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
        jcdThis.canvas.canvasElt.style.display = "inline";
        submitForm.style.display = "none";
        var buttonConfirm = document.createElement("input");
        buttonConfirm.type = "submit";
        buttonConfirm.id = "buttonConfirm";
        buttonConfirm.value = "Confirmer la réservation";
        canvasId.appendChild(buttonConfirm);
        buttonConfirm.addEventListener("click", jcdThis.clickOnSubmitSecond);
    },
    clickOnSubmitSecond: function (event) {
        event.preventDefault();
        console.log("CLISKC CLISCK SECOND  = " + this.id + "!!!!!");
        var reservationText1 = document.createElement("p");
        reservationText1.id = "reservationText1";
        var reservationText2 = document.createElement("p");
        reservationText2.id = "reservationText2";
        finalText.appendChild(reservationText1);
        finalText.appendChild(reservationText2);
        jcdThis.timeToReservation = 1200; //soit 20 minutes en milliseconds
        jcdThis.intervalAnimTextFinal = setInterval('jcdThis.updateFinalText()', 1e3);
    },
    updateFinalText: function() {
        jcdThis.timeToReservation -= 1;
        if (jcdThis.timeToReservation > 0) {
            reservationText1.textContent = "Vélo réservé à la station " + jcdThis.currentStation.name + " par " + firstNameInput.value + " " + nameInput.value;
            reservationText2.textContent = "Temps restants : " + Math.trunc(jcdThis.timeToReservation / 60) + " min " + jcdThis.timeToReservation % 60 + "s";
        }
        else {
            clearInterval(jcdThis.intervalAnimTextFinal);
            reservationText1.textContent = "";
            reservationText2.textContent = "";
        }
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
    //========================================== TMP, A DETRUIRE =======================
    /*
        saveNewDataTimeUpdate: function(reponse) {
            //console.log("reponse[0]= " + reponse[0].last_update + " VS " + jcdThis.lastTimeDataUpdate);
            jcdThis.newDataTimeUpdate = reponse[0].last_update;
        },
        updateDataTime: function () {
          ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract="+jcdThis.contractName+"&apiKey=27ee320d96a32823835e7c985c3f2d6b5c4fc37d", jcdThis.saveNewDataTimeUpdate);
          if (jcdThis.newDataTimeUpdate > jcdThis.lastTimeDataUpdate)
          {
              console.log("REFRESH !!!!!!!!!!!!!!"); // DEBUG
              apiJCD.getContractInfo(jcdThis.contractName);
          }
        },
        launchUpdate: function() {
            jcdThis.updateData = setInterval('jcdThis.updateDataTime()', jcdThis.delay);
        },*/


