const Station = require('./station').Station;

class API_MAPPER {

    getStations() {}

    findStation(query) {}

    getStationInfo(id) {}

    /**
     * 
     * @param {[object]} stations object array returned by the API call
     * @returns {[Station]} the mapped data as array of stations
     */
    mapStations(data) {}

}

exports.API_MAPPER = API_MAPPER;