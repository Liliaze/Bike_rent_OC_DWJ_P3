var Slide = {
    init: function (srcImg, altImg, figcaptionContent) {
        this.srcImg = srcImg;
        this.altImg = altImg;
        this.figcaptionContent = figcaptionContent;
    },
    describe: function () {
        console.log("describe: " + this.srcImg + " " + this.altImg + " " + this.figcaptionContent);
    }
};