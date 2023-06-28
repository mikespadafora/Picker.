"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YelpUtil = /** @class */ (function () {
    function YelpUtil() {
    }
    YelpUtil.initialize = function () {
        this.yelp = require('yelp-fusion');
        this.client = this.yelp.client(this.apiKey);
    };
    YelpUtil.Test = function () {
        var searchRequest = {
            latitude: 40.699911,
            longitude: -74.272813,
            radius: 4000,
            term: 'restaurants',
            categories: 'tacos,mexican,pizza,italian,chinese,pho,korean',
            locale: 'en_US',
            open_now: false,
            sort_by: 'best_match',
            limit: 30,
        };
        return this.client
            .search(searchRequest)
            .then(function (response) {
            var _a;
            var businesses = (_a = response === null || response === void 0 ? void 0 : response.jsonBody) === null || _a === void 0 ? void 0 : _a.businesses;
            console.log(JSON.stringify(businesses));
            return JSON.stringify(businesses);
        })
            .catch(function (error) {
            console.error(error);
            throw error; // Optional: Rethrow the error to be handled by the calling code
        });
    };
    YelpUtil.apiKey = process.env.API_KEY;
    return YelpUtil;
}());
YelpUtil.initialize();
exports.default = YelpUtil;
