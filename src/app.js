const http = require('http');
const express = require('express');

const Linz = require('./mappers/linz/linzmapper').Linz;
const linz = new Linz();

let location = linz;

async function getStations() {
    let stations = await location.getStations();

    console.log(stations);
    for(let station of stations) {
        console.log(station);
    }
}

getStations();