function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    console.log("test Request : " + req.status);
    req.addEventListener("load", function () {

        console.log("test Request 2 : " + req.status);
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            JSON.stringify(req.responseText);
            callback(JSON.parse(req.responseText));
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
};