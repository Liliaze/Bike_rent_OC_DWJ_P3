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
====================== GESTION SLIDER =====================
 */

//Création des éléments du slider
var slide1 = Object.create(Slide);
slide1.init("./img/slide1.png", "Etape 1 du fonctionnement du site", "Figcaption étape 1");
slide1.describe();
var slide2 = Object.create(Slide);
slide2.init("./img/slide2.png", "Etape 2 du fonctionnement du site", "Figcaption étape 2");
slide2.describe();
var slide3 = Object.create(Slide);
slide3.init("./img/slide3.png", "Etape 3 du fonctionnement du site", "Figcaption étape 3");
slide3.describe();
var slide4 = Object.create(Slide);
slide4.init("./img/slide4.png", "Etape 4 du fonctionnement du site", "Figcaption étape 4");
slide4.describe();
//Création d'une variable slider et ajout des éléments dans le tableau
var slider = [];
slider.push(slide1);
slider.push(slide2);
slider.push(slide3);
slider.push(slide4);
//vérife temporaire de la création
slider.forEach(function (s) {
    console.log(s.describe());
});

//récupération de l'élément figure
/*var figureSliderElt = document.getElementById("figureSlider");
console.log("figureElt récupéré = " + figureSliderElt)
*/
var imgSliderElt = document.getElementById("imgSlider");
console.log("imgSliderElt récupéré = " + imgSliderElt + "src= '" + imgSliderElt.src + "' / alt = '" + imgSliderElt.alt);
var figcaptionSliderElt = document.getElementById("figcaptionSlider");
console.log("figcaptionSliderElt récupéré = " + figcaptionSliderElt)
//fonction pour changer la figure affichée dans la div "slider"
var currentIndexSlide = 0;

function changeFigureSliderElt() {
    currentIndexSlide = (currentIndexSlide + 1) % slider.length;
    console.log("i = " + currentIndexSlide);
    imgSliderElt.src = slider[currentIndexSlide].srcImg;
    imgSliderElt.alt = slider[currentIndexSlide].altImg;
    figcaptionSliderElt.textContent = slider[currentIndexSlide].figcaptionContent;
    console.log("appel à changeFigure réussie");
}

//Appel de la fonction pour changer l'image du slider toute les 4 secondes
setInterval(changeFigureSliderElt, 5000);