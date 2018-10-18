var JCD = {
    init: function(contractName, divElt) {
        jcThis = this;
        jcThis.formElt = "";
        jcThis.addHTMLInDiv(divElt);
        jcThis.createMapLeaflet();
        jcThis.stations = [];
        apiJCD.getContractInfo(contractName);
        jcThis.adressElt = document.getElementById("address");
        jcThis.nbStandsElt = document.getElementById("nbStands");
        jcThis.nbBikesElt = document.getElementById("nbBikes");
        jcThis.currentStation = null;
    },
    /*
    ajout de l'HTML pour la map liée au contractName et le formulaire dans la div demandée.
     */
    addHTMLInDiv: function(divElt) {
        document.getElementById(divElt).innerHTML +=
            '    <div id="mapid">\n' +
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
        var mymap = L.map('mapid').setView([45.758890, 4.841390], 13);
        jcThis.mapElt = mymap;
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiZGlhbmFib3VkeSIsImEiOiJjam5jNTJnY3kydDI1M2tydW9hY3M3Y2UwIn0.-_lVVTPD35gJXJg-jUZ9DA'
        }).addTo(mymap);
    },
    /*
    ============================ TRAITEMENT DES DONNEES DE LA REQUETE / AJOUT EVENEMENTIEL ============================
     */
    displayDataInForm: function() {
        jcThis.adressElt.textContent = "Adresse : " + jcThis.currentStation.address;
        jcThis.nbStandsElt.textContent = jcThis.currentStation.nbBikesStands > 1 ? jcThis.currentStation.nbBikesStands + " places" : jcThis.currentStation.nbBikesStands + "place" ;
        jcThis.nbBikesElt.textContent = jcThis.currentStation.availableBikes > 1 ? jcThis.currentStation.availableBikes + " vélos disponibles" : jcThis.currentStation.availableBikes + " vélo disponible";
    },
    clickOnMarker: function(station) {
        console.log("clic sur un marqueur : " + station.name);
        jcThis.currentStation = station;
        jcThis.displayDataInForm();
    },
    displayMarker: function() {
        jcThis.stations.forEach(function (station){
            var marker = L.marker([station.positionLat, station.positionLng],{icon: jcThis.icon}).addTo(jcThis.mapElt);
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
    },
    /*
    ============================== REQUETE AUPRES DE JC DECAUX ==============================
     */
    getContractInfo: function(contractName) {
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract="+contractName+"&apiKey=27ee320d96a32823835e7c985c3f2d6b5c4fc37d", jcThis.dataProcessing);
    },

};

