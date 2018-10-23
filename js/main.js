"use strict";
/*
====================== INTEGRATION DU SLIDER =====================
 */

//Données du slider
var dataSLider = [{src:"./img/slide1.png", alt:"Etape 1 du fonctionnement du site", description:"Choisissez votre station de vélo"},
    {src:"./img/slide2.png", alt:"Etape 2 du fonctionnement du site", description:"Entrez vos nom et prénom puis cliquez sur 'réserver'"},
    {src:"./img/slide3.png", alt:"Etape 3 du fonctionnement du site", description:"Signer dans le champs libre puis confirmez la réservation "},
    {src:"./img/slide4.png", alt:"Etape 4 du fonctionnement du site", description:"Profitez bien de votre vélo, le temps restant pour le récupérer est indiqué"}];

//Création du slider
var slider = Object.create(Slider);
slider.init(dataSLider, "slider");
/*
====================== INTEGRATION API JC DECAUX MAP + FORM ==========================
 */
var apiJCD = Object.create(JCD);
apiJCD.init("Lyon", "part2", "canvas");
