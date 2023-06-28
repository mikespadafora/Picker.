"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = exports.Coordinates = void 0;
var BusinessModel = /** @class */ (function () {
    function BusinessModel() {
        this.name = '';
        this.id = '';
        this.alias = '';
        this.image_url = '';
        this.is_closed = false;
        this.url = '';
        this.review_count = 0;
        this.categories = [];
        this.rating = 0;
        this.coordinates = new Coordinates();
        this.transactions = [];
        this.price = '';
        this.location = new Location();
        this.phone = '';
        this.display_phone = '';
        this.distance = 0;
    }
    return BusinessModel;
}());
var Coordinates = /** @class */ (function () {
    function Coordinates() {
        this.latitude = 0;
        this.longitude = 0;
    }
    return Coordinates;
}());
exports.Coordinates = Coordinates;
var Location = /** @class */ (function () {
    function Location() {
        this.address1 = '';
        this.address2 = '';
        this.address3 = '';
        this.city = '';
        this.zip_code = '';
        this.country = '';
        this.state = '';
        this.display_address = [];
    }
    return Location;
}());
exports.Location = Location;
exports.default = BusinessModel;
