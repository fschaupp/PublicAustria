class API_MAPPER {

    getStations() { }

    findStation(query) { }

    getStationInfo(id) { }

    /**
     * 
     * @param {[object]} stations object array returned by the API call
     * @returns {[Station]} the mapped data as array of stations
     */
    mapStations(data) { }
}

exports.API_MAPPER = API_MAPPER;
exports.Station = require('./station.js').Station;
exports.Location = require('./location').Location;
exports.Request = require('superagent');