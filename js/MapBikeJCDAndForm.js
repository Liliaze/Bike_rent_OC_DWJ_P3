var JCD = {
    init: function(contractName, divElt) {
        jcThis = this;
        jcThis.formElt = "";
        jcThis.addHTMLInDiv(divElt);
        jcThis.createMapLeaflet();
        jcThis.stations = [];
        jcThis.contractName = contractName;
        jcThis.currentStation = null;
        //jcThis.delay = 100000;
        jcThis.lastTimeDataUpdate = 0;
        jcThis.newTimeDataUpdate = 0;
        apiJCD.getContractInfo(contractName);
        jcThis.mapDivElt = document.getElementById("mapId");
        jcThis.divForm = document.getElementById("divForm");
        jcThis.form = document.getElementById("form");
        jcThis.adressElt = document.getElementById("address");
        jcThis.nbStandsElt = document.getElementById("nbStands");
        jcThis.nbBikesElt = document.getElementById("nbBikes");
        window.addEventListener("resize", jcThis.resizeWindow);
        //this.launchUpdate();
    },
    /*
    ajout de l'HTML pour la map liée au contractName et le formulaire dans la div demandée.
     */
    addHTMLInDiv: function(divElt) {
        document.getElementById(divElt).innerHTML +=
            '    <div id="mapId">\n' +
            '    </div>\n' +
            '    <div id="divForm">\n' +
            '        <i class="fas fa-map-marker-alt"></i>\n' +
            '        <form id="form"><fieldset>\n' +
            '            <legend>Détails de la station...</legend>\n' +
            '            <p id="address">\n' +
            '                Merci de choisir une station\n' +
            '            </p>\n' +
            '            <p id="nbStands">\n' +
            '               \n' +
            '            </p>\n' +
            '            <p id="nbBikes">\n' +
            '                \n' +
            '            </p>\n' +
            '            <p class="input">\n' +
            '                <label for="name">Nom :</label>\n' +
            '                <input type="text" name="name" id="name" placeholder="nom" value="nom" autofocus required>\n' +
            '            </p>\n' +
            '            <p class="input">\n' +
            '                <label for="firstName">Prénom :</label>\n' +
            '                <input type="text" name="firstName" id="firstName" placeholder="prénom" value="prénom" required>\n' +
            '            </p>\n' +
            '            <input id="réserver" type="submit" value="Réserver" />\n' +
            '        </fieldset></form>\n' +
            '    </div>';
    },
    /*
    ============================== MAP LEAFLET INSTANCIATION ====================================
     */
    createMapLeaflet: function() {
        var myIcon = L.icon({
            iconUrl: './img/bikeIcon.png',
            iconSize: [38, 60],
            iconAnchor: [22, 59],
            popupAnchor: [-3, -59],
            shadowUrl: './img/bikeIconShadow.png',
            shadowSize: [68, 60],
            shadowAnchor: [22, 59]
        });
        jcThis.icon = myIcon;
        var mymap = L.map('mapId').setView([45.758890, 4.841390], 13); // a changer !!!
        jcThis.mapId = mymap;
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiZGlhbmFib3VkeSIsImEiOiJjam5jNTJnY3kydDI1M2tydW9hY3M3Y2UwIn0.-_lVVTPD35gJXJg-jUZ9DA'
        }).addTo(mymap);
    },
    /*
    ================================ FONCTIONS EVENEMENTIELLES ============================
     *//*
    saveNewDataTimeUpdate: function(reponse) {
        //console.log("reponse[0]= " + reponse[0].last_update + " VS " + jcThis.lastTimeDataUpdate);
        jcThis.newDataTimeUpdate = reponse[0].last_update;
    },
    updateDataTime: function () {
      ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract="+jcThis.contractName+"&apiKey=27ee320d96a32823835e7c985c3f2d6b5c4fc37d", jcThis.saveNewDataTimeUpdate);
      if (jcThis.newDataTimeUpdate > jcThis.lastTimeDataUpdate)
      {
          console.log("REFRESH !!!!!!!!!!!!!!"); // DEBUG
          apiJCD.getContractInfo(jcThis.contractName);
      }
    },
    launchUpdate: function() {
        jcThis.updateData = setInterval('jcThis.updateDataTime()', jcThis.delay);
    },*/
    resizeWindow: function() {
        if (jcThis.currentStation === null) {
            return;
        }
        var screenWidth = (document.body.clientWidth);
        var screenHeight = (document.body.clientHeight);
        if (screenWidth > 1024) {
            jcThis.divForm.style.width = "25%";
            jcThis.mapDivElt.style.width = "74%";
        }
        else {
            jcThis.divForm.style.width = "100%";
            jcThis.mapDivElt.style.width = "100%";
        }
    },
    clickOnMarker: function(station) {
        jcThis.divForm.style.display = "block";
        jcThis.currentStation = station;
        jcThis.displayDataInForm();
        jcThis.resizeWindow();
    },
    /*
    ============================ TRAITEMENT DES DONNEES DE LA REQUETE / LANCEMENT EVENEMENTIEL ============================
     */
    displayDataInForm: function() {
        jcThis.adressElt.textContent = "Adresse : " + jcThis.currentStation.address;
        jcThis.nbStandsElt.textContent = jcThis.currentStation.nbBikesStands > 1 ? jcThis.currentStation.nbBikesStands + " places" : jcThis.currentStation.nbBikesStands + "place" ;
        jcThis.nbBikesElt.textContent = jcThis.currentStation.availableBikes > 1 ? jcThis.currentStation.availableBikes + " vélos disponibles" : jcThis.currentStation.availableBikes + " vélo disponible";
    },
    displayMarker: function() {
        jcThis.stations.forEach(function (station){
            var marker = L.marker([station.positionLat, station.positionLng],{icon: jcThis.icon}).addTo(jcThis.mapId);
            marker.bindPopup("<b>"+station.name+"</b>").openPopup();
            marker.on('click', function (){jcThis.clickOnMarker(station);});
        });
    },
    displayStations: function() {
        jcThis.stations.forEach(function (station){
            console.log(station);
        });
    },
    dataProcessing: function(reponse) {
        reponse.forEach(function (element) {
            var station = Object.create(BikeStation);
            station.init(element);
            jcThis.stations.push(station);
        });
        jcThis.displayMarker();
        jcThis.lastTimeDataUpdate = reponse[0].last_update;
    },
    /*
    ============================== REQUETE AUPRES DE JC DECAUX ==============================
     */
    getContractInfo: function(contractName) {
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract="+contractName+"&apiKey=27ee320d96a32823835e7c985c3f2d6b5c4fc37d", jcThis.dataProcessing);
    },

};

