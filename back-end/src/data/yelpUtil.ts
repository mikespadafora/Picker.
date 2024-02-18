import { BusinessSearchConfig } from './dataInterfaces';
import { Restaurant } from '../logic/parser-util';

require('dotenv').config();

class YelpUtil {
  public static async search(
    config: BusinessSearchConfig,
  ): Promise<Restaurant[]> {
    const sdk = require('api')('@yelp-developers/v1.0#8e0h2zlqcimwm0');

    sdk.auth(process.env.API_KEY);

    try {
      const response = await sdk.v3_business_search({
        latitude: config.latitude,
        longitude: config.longitude,
        locale: 'en_US',
        open_now: config.open_now,
        sort_by: 'best_match',
        limit: 50,
        radius: config.radius,
        term: 'food',
        categories: config.categories,
        device_platform: 'ios',
        price: config.price,
      });

      //console.log(JSON.stringify(response.data.businesses));

      return response.data.businesses;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default YelpUtil;
