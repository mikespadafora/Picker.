import axios from 'axios';
import Config from 'react-native-config';

import { Coordinates } from './types';

export default class RequestUtil {
  public static async getRestaurants(
    radius: number | null,
    latitude: number | null,
    longitude: number | null,
    keywords: string[]
  ) {
    try {
      const response = await axios.get('http://localhost:3000/search', {
        params: {
          latitude: latitude,
          longitude: longitude,
          radius: radius,
          keywords: keywords.join(','),
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getCoordinates(zipCode: string): Promise<Coordinates> {
    try {
      const response = await axios.get(`https://geocode.maps.co/search`, {
        params: {
          postalcode: zipCode,
          format: 'json',
          limit: 1,
          countrycodes: 'us',
        },
      });

      const location = response.data[0];

      const coords: Coordinates = {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      };

      return coords;
    } catch (error) {
      console.error('Failed to get location:', error);
      throw error;
    }
  }
}
