var Slide = {
    init: function (src, alt, figcaption) {
        this.src = src;
        this.alt = alt;
        this.figcaption = figcaption;
    },
    describe: function () {
        console.log("describe: " + this.src + " " + this.alt + " " + this.figcaption);
    }
};