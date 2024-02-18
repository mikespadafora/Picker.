"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserUtil = void 0;
var ParserUtil = /** @class */ (function () {
    function ParserUtil() {
    }
    ParserUtil.parseRestaurant = function (restaurants) {
        var parsedRestaurants = [];
        for (var i = 0; i < restaurants.length; i++) {
            var data = restaurants[i];
            var category = data.categories.map(function (item) { return item.title; }).join(', ');
            var distanceInMiles = data.distance * 0.000621371; // Conversion from meters to miles
            var roundedDistance = Math.round(distanceInMiles * 10) / 10; // Rounding to the nearest tenth
            var price = data.price ? data.price : null;
            var address = data.location.display_address.join(', ');
            parsedRestaurants.push({
                name: data.name,
                imageUrl: data.image_url,
                url: data.url,
                reviewCount: data.review_count,
                category: category,
                rating: data.rating,
                transactions: data.transactions,
                price: price,
                address: address,
                displayPhone: data.display_phone,
                phone: data.phone,
                distance: roundedDistance,
            });
        }
        /* Array.from(restaurants).forEach((data) => {
          const category =
            data.categories.length > 0 ? data.categories[0].title : '';
          const distanceInMiles = data.distance * 0.000621371; // Conversion from meters to miles
          const roundedDistance = Math.round(distanceInMiles * 10) / 10; // Rounding to the nearest tenth
          const price = data.price ? data.price : null;
          const address = data.location.display_address.join(', ');
    
          parsedRestaurants.push({
            name: data.name,
            imageUrl: data.image_url,
            url: data.url,
            reviewCount: data.review_count,
            category,
            rating: data.rating,
            transactions: data.transactions,
            price: price,
            address: address,
            displayPhone: data.display_phone,
            phone: data.phone,
            distance: roundedDistance,
          });
        }); */
        return parsedRestaurants;
    };
    return ParserUtil;
}());
exports.ParserUtil = ParserUtil;
