const Linz = require('./mappers/linz/linzmapper').Linz;
const linz = new Linz();

const Wien = require('./mappers/wien/wienmapper').Wien;
const wien = new Wien();

let location = wien;

async function getStations() {
    let stations = await location.getStations();
    let unique = (array, element) => {
        if (!array.includes(element))
            array.push(element)

        return array;
    }

    stations
        .filter(station => station.location)
        .map(station => station.location.place)
        .reduce(unique, new Array())
        .sort()
        .forEach(name => {
            console.log(name);
        });

}

getStations();