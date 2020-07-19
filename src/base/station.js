const stations = new Array();

class Station {

    constructor(id, name, location, optional) {
        this.id = id;
        this.name = name.trim();
        this.location = location;
        this.raoptionalw = optional;

        if (stations.filter(station => station.id === this.id).length === 0)
            stations.push(this);
    }

}

exports.Station = Station;