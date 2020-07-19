const { API_MAPPER, Station, Location, Request } = require('../../base/apimapper');

const API_LINK = 'http://www.wienerlinien.at/ogd_realtime';
const HALTESTELLEN_CSV = `${API_LINK}/doku/ogd/wienerlinien-ogd-haltestellen.csv`;

class Wien extends API_MAPPER {

  getStations() {
    return Request.get(HALTESTELLEN_CSV).then(res => {
      let data = this.getDataFromResponse(res);
      let stations = this.mapStations(data);

      return stations;
    })
  }

  getDataFromResponse(res) {
    return res.text.trim();
  }

  mapStations(data) {
    let delimiter = ';';

    let lines = data.split('\r\n');
    let header = lines[0].split(delimiter);
    data = new Array();

    for (let line of lines) {
      let entry = {};
      let lineData = line.split(delimiter);

      for (let i = 0; i < header.length; i++) {
        entry[header[i]] = lineData[i];
      }

      data.push(entry);
    }

    data.splice(0, 1); // remove headers

    let stations = new Array();
    for (let entry of data) {
      let location = new Location(entry.MunicipalityID, entry.PlatformText, undefined, entry.Municipality, {longitude: entry.Longitude, latitude: entry.Latitude});
      let station = new Station(entry.DIVA, entry.PlatformText, location, entry);
      stations.push(station);
    }

    return stations;
  }

}

exports.Wien = Wien;