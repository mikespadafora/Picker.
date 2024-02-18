"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fuse = require('fuse.js');
var RestaurantProcessor = /** @class */ (function () {
    function RestaurantProcessor(restaurants) {
        this.options = {
            includeScore: true,
            keys: ['name', 'categories.title'],
            findAllMatches: true,
        };
        this.restaurants = [];
        this.restaurants = restaurants;
        this.fuse = new Fuse(this.restaurants, this.options);
    }
    RestaurantProcessor.prototype.filterResults = function (keywords) {
        var _this = this;
        console.log(keywords);
        var results = keywords.map(function (keyword) {
            return _this.fuse.search(keyword.toLowerCase());
        });
        var mergedResults = results.flat().map(function (obj) { return obj.item; });
        if (mergedResults.length) {
            var trimmedResults = this.removeDuplicateResults(mergedResults);
            return trimmedResults;
        }
        return [];
    };
    RestaurantProcessor.prototype.removeDuplicateResults = function (originalResults) {
        var uniqueIds = new Set();
        var uniqueResults = [];
        originalResults.forEach(function (restaurant) {
            if (!uniqueIds.has(restaurant.id)) {
                uniqueResults.push(restaurant);
                uniqueIds.add(restaurant.id);
            }
        });
        console.log(originalResults.length);
        console.log(uniqueResults.length);
        return uniqueResults;
    };
    return RestaurantProcessor;
}());
exports.default = RestaurantProcessor;
