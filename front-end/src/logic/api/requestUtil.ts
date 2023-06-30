import axios from 'axios';
import Config from 'react-native-config';

export default class RequestUtil {
  private static url: string = Config.SERVER_URL as string;

  public static async getRestaurants(
    radius: number,
    latitude: number,
    longitude: number,
    keywords: string[]
  ) {
    try {
      const response = await axios.get(`https://${this.url}`, {
        params: {
          latitude,
          longitude,
          radius,
          keywords: keywords.join(','),
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
