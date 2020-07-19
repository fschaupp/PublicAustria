const { API_MAPPER, Station, Location, Request} = require('../../base/apimapper');

const API_LINK = "http://www.linzag.at/static";
const TRIP_REQUEST = "XML_TRIP_REQUEST2";
const STOPFINDER = "XML_STOPFINDER_REQUEST"

class Linz extends API_MAPPER {

    getStations() {

        return Request.get(`${API_LINK}/${STOPFINDER}`)
            .query({ type_sf: 'any', name_sf: 'any', outputFormat: 'JSON' })
            .set('Accept', 'application/json')
            .then(res => {
                let data = this.getDataFromResponse(res);
                let stations = this.mapStations(data);

                return stations;
            });
    }

    getDataFromResponse(res) {
        let data;

        if (res.header['content-type'] && res.header['content-type'].includes('json')) {
            data = res.body;
        } else {
            data = JSON.parse(res.text);
        }

        return data;
    }

    findStation(query) {

    }

    getStationInfo(id) {

    }

    mapStations(data) {
        let stations = new Array();

        for (let point of data.stopFinder.points) {

            let location = new Location(point.ref.omc, point.street, point.postcode, point.ref.place, point.ref);
            let station = new Station(point.ref.id, point.object, location, point);

            stations.push(station);
        }

        return stations;
    }

}

exports.Linz = Linz;