"use strict";/*
console.log("Hello_test");
window.addEventListener("beforeunload", function (e) {
    //AJOUTER UNE CONDITION : SI IL RESTE UNE RESERVATION : RISQUE DE PERTE
    // prompt("test");
    var message = "On est bien ici !";
    e.returnValue = message; // Provoque une demande de confirmation (standard)
    return message; // Provoque une demande de confirmation (certains navigateurs)
});*/
/*
====================== INTEGRATION DU SLIDER =====================
 */

//Données du slider
var dataSLider = [{src:"./img/slide1.png", alt:"Etape 1 du fonctionnement du site", description:"Figcaption étape 1"},
    {src:"./img/slide2.png", alt:"Etape 2 du fonctionnement du site", description:"Figcaption étape 2"},
    {src:"./img/slide3.png", alt:"Etape 3 du fonctionnement du site", description:"Figcaption étape 3"},
    {src:"./img/slide4.png", alt:"Etape 4 du fonctionnement du site", description:"Figcaption étape 4"}];

//Création du slider
var slider = Object.create(Slider);
slider.init(dataSLider, "slider");
/*
====================== INTEGRATION API JC DECAUX MAP + FORM ==========================
 */
var apiJCD = Object.create(JCD);
apiJCD.init("Lyon", "part2");

/*
================================ END MAIN SCRIPT ================================
 */
console.log("=====END=====");
