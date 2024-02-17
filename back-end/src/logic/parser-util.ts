interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Category {
  alias: string;
  title: string;
}

interface Location {
  address1: string;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

export interface Restaurant {
  name: string;
  image_url: string;
  url: string;
  review_count: number;
  categories: Category[];
  rating: number;
  transactions: string[];
  price: string;
  location: Location;
  display_phone: string;
  phone: string;
  distance: number;
}

export interface ParsedRestaurant {
  name: string;
  imageUrl: string;
  url: string;
  reviewCount: number;
  category: string;
  rating: number;
  transactions: string[];
  price: string | null;
  address: string;
  displayPhone: string;
  phone: string;
  distance: number;
}

export class ParserUtil {
  static parseRestaurant(restaurants: Restaurant[]): ParsedRestaurant[] {
    let parsedRestaurants: ParsedRestaurant[] = [];

    Array.from(restaurants).forEach((data) => {
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
    });

    return parsedRestaurants;
  }
}
