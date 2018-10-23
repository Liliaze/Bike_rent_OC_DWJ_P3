var Canvas = {
    init : function(canvasDivId) {
        cthis = this;
        cthis.canvasElt = this.addCanvasInDIv(canvasDivId);
        cthis.ctx = this.canvasElt.getContext('2d');
        cthis.imagePencil = new Image();
        cthis.imagePencil.onload = e => cthis.ctx.drawImage(cthis.imagePencil, 5, 5, 50, 50);
        cthis.ctx.font="14px Georgia";
        cthis.ctx.fillText("Signature!",5,72);
        cthis.imagePencil.src = "./img/pencil.png";;
        cthis.isDrawing = false;
        cthis.eventCanvas();
        //document.body.onload = function (){cthis.startUp();};
    },
    addCanvasInDIv: function (canvasDivId) {
        var canvasElt = document.createElement("canvas");
        canvasElt.id = "c";
        canvasElt.textContent = "zone de dessin de signature";
        canvasElt.style.width = "280px";
        document.getElementById(canvasDivId).appendChild(canvasElt);
        return canvasElt;
    },
    eventCanvas: function () {
        cthis.canvasElt.addEventListener("mousedown", cthis.canvasDrawStart);
        cthis.canvasElt.addEventListener("mousemove", cthis.canvasDrawing);
        cthis.canvasElt.addEventListener("mouseup", cthis.canvasDrawStop);
        cthis.canvasElt.addEventListener("mouseout", cthis.canvasDrawStop);
    },
    canvasDrawStart: function(e) {
            cthis.isDrawing = true;
            cthis.ctx.moveTo((e.pageX - cthis.canvasElt.offsetLeft), (e.pageY - cthis.canvasElt.offsetTop));
        },
    canvasDrawing: function (e) {
        if (cthis.isDrawing) {
            cthis.ctx.lineTo((e.pageX - cthis.canvasElt.offsetLeft), (e.pageY - cthis.canvasElt.offsetTop));
            cthis.ctx.stroke();
        }
    },
    canvasDrawStop: function () {
        cthis.isDrawing = false;
    },
    //GESTION TOUCH SUR MOBILE
    startUp: function() {
        console.log("startevent ===");
        cthis.canvasElt.addEventListener("touchstart", cthis.handleStart, false);
        cthis.canvasElt.addEventListener("touchmove", cthis.handleMove, false);
        cthis.canvasElt.addEventListener("touchend", cthis.handleEnd, false);
        cthis.canvasElt.addEventListener("touchleave", cthis.handleEnd, false);
        cthis.canvasElt.addEventListener("touchcancel", cthis.handleCancel, false);
    }
};