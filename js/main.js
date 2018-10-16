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