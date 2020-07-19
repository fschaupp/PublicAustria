const locations = new Array();

class Location {

    constructor(id, street, zip, place, optional) {
        this.id = id;
        this.place = place.trim();
        if (zip)
            this.zip = parseInt(zip);
        if (street)
            this.street = street.trim();
        this.optional = optional;

        if (locations.filter(location => location.id === this.id).length === 0)
            locations.push(this);
    }
}

exports.Location = Location;