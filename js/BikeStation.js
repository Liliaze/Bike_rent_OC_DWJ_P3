var BikeStation = {
    init: function (data) {
        this.name = data.name;
        this.address = data.address;
        this.nbBikesStands = data.bike_stands;
        this.availableBikesStand = data.available_bike_stands;
        this.availableBikes = data.available_bikes;
        this.lastUpdate = data.last_update;
        this.positionLat = data.position.lat;
        this.positionLng = data.position.lng;
        this.status = data.status;
    },
    describe: function () {
        console.log("station description : " +
            this.name + " adress:" +
            this.address + " supports:" +
            this.nbBikesStands + " supportsDispo:" +
            this.availableBikesStand  + " veloDispo:" +
            this.availableBikes + " update:" +
            this.lastUpdate + " lat:" +
            this.positionLat  + " long:" +
            this.positionLng  + " status:" +
            this.status+".");
    }
};