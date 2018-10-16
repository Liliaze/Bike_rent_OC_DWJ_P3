"use strict";
console.log("Hello_test");
window.addEventListener("beforeunload", function (e) {
    //AJOUTER UNE CONDITION : SI IL RESTE UNE RESERVATION : RISQUE DE PERTE
    // prompt("test");
    var message = "On est bien ici !";
    e.returnValue = message; // Provoque une demande de confirmation (standard)
    return message; // Provoque une demande de confirmation (certains navigateurs)
});
/*
====================== INTEGRATION DU SLIDER =====================
 */

//Données du slider
var dataSLider = [{src:"./img/slide1.png", alt:"Etape 1 du fonctionnement du site", description:"Figcaption étape 1"},
    {src:"./img/slide2.png", alt:"Etape 2 du fonctionnement du site", description:"Figcaption étape 2"},
    {src:"./img/slide3.png", alt:"Etape 3 du fonctionnement du site", description:"Figcaption étape 3"},
    {src:"./img/slide4.png", alt:"Etape 4 du fonctionnement du site", description:"Figcaption étape 4"}];

//récupération des éléments du dom lié au slider
var imgSliderElt = document.getElementById("imgSlider");
var figcaptionSliderElt = document.getElementById("figcaptionSlider");
var arrowLeftElt = document.getElementById("arrowLeft");
var arrowRightElt = document.getElementById("arrowRight");

//Création du slider
var slider = Object.create(Slider);
slider.init(dataSLider, imgSliderElt, figcaptionSliderElt, arrowLeftElt, arrowRightElt);
/*
=================================== GESTION DE LA SUITE =================================
*/
console.log("test");
/*
======================= MAP LEAFLET INSTANCIATION ======================
 */
var myIcon = L.icon({
    iconUrl: './img/bikeIcon.png',
    iconSize: [38, 60],
    iconAnchor: [22, 59],
    popupAnchor: [-3, -59],
    shadowUrl: './img/bikeIconShadow.png',
    shadowSize: [68, 60],
    shadowAnchor: [22, 59]
});
var mymap = L.map('mapid').setView([45.758890, 4.841390], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGlhbmFib3VkeSIsImEiOiJjam5jNTJnY3kydDI1M2tydW9hY3M3Y2UwIn0.-_lVVTPD35gJXJg-jUZ9DA'
}).addTo(mymap);
var marker = L.marker([45.758890, 4.841390],{icon: myIcon}).addTo(mymap);
marker.bindPopup("<b>Station name</b>").openPopup();
var popup = L.popup();
function onMapClick(e) {
    console.log("click on map");
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
function testClickMarker() {
    console.log("clic sur un marqueur");
}
mymap.on('click', onMapClick);
marker.on('click', testClickMarker);

/*
====================== INTEGRATION API JC DECAUX =======================
 */
