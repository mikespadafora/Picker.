import { BusinessSearchConfig } from './dataInterfaces';

require('dotenv').config();

class YelpUtil {
  private static yelp: any;
  private static client: any;

  public static initialize() {
    this.yelp = require('yelp-fusion');
    this.client = this.yelp.client(process.env.API_KEY);
    console.log(this.client);
  }

  public static async search(config: BusinessSearchConfig): Promise<JSON> {
    return this.client
      .search(config)
      .then((response: any) => {
        const businesses = response?.jsonBody?.businesses;
        console.log(JSON.stringify(businesses));
        return businesses;
      })
      .catch((error: Error) => {
        console.error(error);
        throw error;
      });
  }
}

YelpUtil.initialize();

export default YelpUtil;
