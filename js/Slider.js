var Slider = {
    init : function(data, divImageId) {
        othis = this;
        othis.addHTMLInDiv(divImageId);
        othis.currentIndex = 0;
        othis.delay = 5000;
        othis.imgElt = document.getElementById("imgSlider");
        othis.imgElt.style.opacity = 1;
        othis.figElt = document.getElementById("figcaptionSlider");
        othis.arrowLeftElt = document.getElementById("arrowLeft");
        othis.arrowRightElt = document.getElementById("arrowRight");
        othis.slider = [];
        for (i = 0; i < data.length; i++) {
            othis.addSlide(data[i].src, data[i].alt, data[i].description);
        };
        this.launchAnim();
        othis.startEventOnSlider();
    },
    addHTMLInDiv: function(divImgId) {
        document.getElementById(divImgId).innerHTML +=
            '    <img id="arrowLeft" class="slider" src="./img/arrowLeft.png" alt="Une flêche vers la gauche">\n' +
            '    <figure id="figureSlider" class ="slider">\n' +
            '        <img id="imgSlider" class="slider" src="img/slide1.png" alt="slider description fonctionnement de la page">\n' +
            '        <figcaption id="figcaptionSlider">Essaie premiere image</figcaption>\n' +
            '    </figure>\n' +
            '    <img id="arrowRight" class="slider" src="./img/arrowRight.png" alt="Une flêche vers la droite">';
    },
    addSlide: function(src, alt, description) {
        var slide = Object.create(Slide);
        slide.init(src, alt, description);
        slide.describe();
        othis.slider.push(slide);
      },
    launchAnim: function() {
        othis.intervalAnimSlider = setInterval('othis.slideAfter()', othis.delay);
        console.log("appel à After démarré");
    },
    stopAnim: function() {
        clearInterval(othis.intervalAnimSlider);
        console.log("animation stoppé");
    },
    describe: function() {
        othis.slider.forEach(function (s) {
            console.log(s.describe());
        });
        console.log("describe currentIndex = " + othis.currentIndex);
    },
    sleep: function (delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    },
    //fonction pour changer les données d'une figure
    slideAfter: function() {
        othis.animationId = requestAnimationFrame(othis.disparitionSlide);
        othis.currentIndex = (othis.currentIndex + 1) % othis.slider.length;
        othis.changeDataSlide();
    },
    slideBefore: function () {
        othis.animationId = requestAnimationFrame(othis.disparitionSlide);
        othis.currentIndex = (othis.currentIndex - 1 < 0? othis.slider.length - 1 : othis.currentIndex - 1);
        othis.changeDataSlide();
    },
    keyPress: function(e) {
        if (e.keyCode == 39){
            othis.slideAfter();
        }
        else if (e.keyCode == 37) {
            othis.slideBefore();
        }
    },
    disparitionSlide: function () {
        if (parseFloat(othis.imgElt.style.opacity) > 0.4) {
            othis.imgElt.style.opacity = parseFloat(othis.imgElt.style.opacity) - 0.1;
            othis.animationId = requestAnimationFrame(othis.disparitionSlide);
        } else if (parseFloat(othis.imgElt.style.opacity) == 0.4) {
            cancelAnimationFrame(othis.animationId);
            othis.animationId = requestAnimationFrame(othis.apparitionSlide);
        }
    },
    apparitionSlide: function () {
        if (parseFloat(othis.imgElt.style.opacity) < 1.0) {
            othis.imgElt.style.opacity = parseFloat(othis.imgElt.style.opacity) + 0.02;
            othis.animationId = requestAnimationFrame(othis.apparitionSlide);
        } else {
            cancelAnimationFrame(othis.animationId);
        }
    },
    changeDataSlide: function () {
        othis.imgElt.src = othis.slider[othis.currentIndex].src;
        othis.imgElt.alt = othis.slider[othis.currentIndex].alt;
        othis.figElt.textContent = othis.slider[othis.currentIndex].figcaption;
    },
    setDelay: function(newDelay) {
      othis.delay = newDelay;
    },

    testEnd: function () {
        console.log("CLICK, CLICK !!!!!!!!!!");
    },
    startEventOnSlider: function () {
        othis.arrowLeftElt.addEventListener("click", othis.slideBefore);
        othis.arrowRightElt.addEventListener("click", othis.slideAfter);
        document.addEventListener("keydown", othis.keyPress);
        document.addEventListener("keydown", othis.keyPress);
        othis.imgElt.addEventListener("mouseenter", othis.stopAnim);
        othis.arrowLeftElt.addEventListener("mouseenter", othis.stopAnim);
        othis.arrowRightElt.addEventListener("mouseenter", othis.stopAnim);
        othis.imgElt.addEventListener("mouseout", othis.launchAnim);
        othis.imgElt.addEventListener("animationEnd", othis.testEnd);
    }
};