const superagent = require('superagent');

const API_MAPPER = require('../../base/apimapper').API_MAPPER;
const Station = require('../../base/station').Station;

const API_LINK = "http://www.linzag.at/static";
const TRIP_REQUEST = "XML_TRIP_REQUEST2";
const STOPFINDER = "XML_STOPFINDER_REQUEST"

class Linz extends API_MAPPER {

    getStations() {

        return superagent.get(`${API_LINK}/${STOPFINDER}`)
            .query({type_sf: 'any', name_sf:'any', outputFormat:'JSON'})
            .set('Accept', 'application/json')
            .then(res => {                
                let data = this.getDataFromResponse(res);
                let stations = this.mapStations(data);

                console.log(stations);

                return stations;
            });
    }

    getDataFromResponse(res) {
        let data;

        if (res.header['content-type'] && res.header['content-type'].includes('json')){
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

        for(let point of data.stopFinder.points) {
            stations.push(new Station(point.ref.id, point.object, point.ref.place));
        }

        return stations;
    }

}

exports.Linz = Linz;