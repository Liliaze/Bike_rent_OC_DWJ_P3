var Slider = {
    init : function(data, divImageId) {
        othis = this;
        othis.divImageElt = document.getElementById(divImageId);
        othis.addHTMLInDiv();
        othis.currentIndex = 0;
        othis.delay = 5000
        othis.slider = [];
        for (i = 0; i < data.length; i++) {
            othis.addSlide(data[i].src, data[i].alt, data[i].description);
        };
        this.launchAnim();
        othis.startEventOnSlider();
        playButton.style.opacity = "0.4";
        pauseButton.style.opacity = "0.4";
    },
    addHTMLInDiv: function() {
        othis.divImageElt.innerHTML +=
            '    <img id="arrowLeft" class="slider" src="./img/arrowLeft.png" alt="Une flêche vers la gauche">\n' +
            '    <figure id="figureSlider" class ="slider">\n' +
            '        <img id="imgSlider" class="slider" src="img/slide1.png" alt="slider description fonctionnement de la page">\n' +
            '        <figcaption id="figcaptionSlider">Essaie premiere image</figcaption>\n' +
            '    </figure>\n' +
            '    <img id="arrowRight" class="slider" src="./img/arrowRight.png" alt="Une flêche vers la droite">\n' +
            '    <img id="pauseButton" class="slider" src="./img/pauseButton.png" alt="Un bouton pause">\n' +
            '    <img id="playButton" class="slider" src="./img/playButton.png" alt="Un bouton play">';
    },

    //CREATION DES SLIDES AVEC L'OBJET SLIDE
    addSlide: function(src, alt, description) {
        var slide = Object.create(Slide);
        slide.init(src, alt, description);
        slide.describe();
        othis.slider.push(slide);
      },

    // GESTION DES EVENEMENTS
    startEventOnSlider: function () {
        arrowRight.addEventListener("click", othis.slideAfter);
        arrowLeft.addEventListener("click", othis.slideBefore);
        document.addEventListener("keydown", othis.keyPress);
        playButton.addEventListener("click", othis.launchAnim);
        pauseButton.addEventListener("click", othis.stopAnim);
        othis.divImageElt.addEventListener("mouseenter", othis.displayButton);
        othis.divImageElt.addEventListener("mouseleave", othis.blurButton);
    },
    slideAfter: function() { //changement slide suivante
        othis.animationId = requestAnimationFrame(othis.disparitionSlide);
        othis.currentIndex = (othis.currentIndex + 1) % othis.slider.length;
        othis.changeDataSlide();
    },
    slideBefore: function () { //changement slide précédente
        othis.animationId = requestAnimationFrame(othis.disparitionSlide);
        othis.currentIndex = (othis.currentIndex - 1 < 0? othis.slider.length - 1 : othis.currentIndex - 1);
        othis.changeDataSlide();
    },
    changeDataSlide: function () { //chargement des nouvelles données de la slide
        imgSlider.src = othis.slider[othis.currentIndex].src;
        imgSlider.alt = othis.slider[othis.currentIndex].alt;
        figcaptionSlider.textContent = othis.slider[othis.currentIndex].figcaption;
    },
    keyPress: function(e) { //gestion des evenements clavier
        if (e.keyCode == 39){
            othis.slideAfter();
        }
        else if (e.keyCode == 37) {
            othis.slideBefore();
        }
    },
    launchAnim: function() { //fonction pour lancer l'animation automatique
        othis.animStatus = true;
        playButton.style.display = "none";
        pauseButton.style.display = "block";
        othis.intervalAnimSlider = setInterval('othis.slideAfter()', othis.delay);
        console.log("appel à After démarré");
    },
    stopAnim: function() { //arret de l'animation auto
        othis.animStatus = false;
        pauseButton.style.display = "none";
        clearInterval(othis.intervalAnimSlider);
        playButton.style.display = "block";
        console.log("animation stoppé");
    },

    //ANIMATION PROGRESSIVE DES SLIDES AU CHANGEMENT DE SLIDE
    disparitionSlide: function () {
        if (parseFloat(imgSlider.style.opacity) > 0.4) {
            imgSlider.style.opacity = (parseFloat(imgSlider.style.opacity) - 0.1).toString();
            othis.animationId = requestAnimationFrame(othis.disparitionSlide);
        } else if (parseFloat(imgSlider.style.opacity) == 0.4) {
            cancelAnimationFrame(othis.animationId);
            othis.animationId = requestAnimationFrame(othis.apparitionSlide);
        }
    },
    apparitionSlide: function () {
        if (parseFloat(imgSlider.style.opacity) < 1.0) {
            imgSlider.style.opacity = (parseFloat(imgSlider.style.opacity) + 0.02).toString();
            othis.animationId = requestAnimationFrame(othis.apparitionSlide);
        } else {
            cancelAnimationFrame(othis.animationId);
        }
    },

    //ANIMATION PROGRESSIVE DES BOUTONS PAUSE ET PLAY
    displayButton: function () {
        var currentButton;
        if (othis.animStatus === true)
            currentButton = pauseButton;
        else
            currentButton = playButton;
        if (parseFloat(currentButton.style.opacity) < 1.0) {
            currentButton.style.opacity = (parseFloat(currentButton.style.opacity) + 0.1).toString();
            othis.displayAnimId = requestAnimationFrame(othis.displayButton);
        } else
            cancelAnimationFrame(othis.displayAnimId);
    },
    blurButton: function () {
        if (othis.animStatus === true)
            currentButton = pauseButton;
        else
            currentButton = playButton;
        if (parseFloat(currentButton.style.opacity) > 0.0) {
            currentButton.style.opacity = (parseFloat(currentButton.style.opacity) - 0.1).toString();
            othis.displayAnimId = requestAnimationFrame(othis.blurButton);
        } else
            cancelAnimationFrame(othis.displayAnimId);
    },

    //OPTION POUR CHANGER LE DELAY ENTRE CHAQUE SLIDE
    setDelay: function(newDelay) {
        othis.delay = newDelay;
    },

    //DESCRIPTION DE L'OBJET SLIDER
    describe: function() {
        othis.slider.forEach(function (s) {
            console.log(s.describe());
        });
        console.log("describe currentIndex = " + othis.currentIndex);
    },
};