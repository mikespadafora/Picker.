import { IBusinessSearchConfig } from './dataInterfaces';

class YelpUtil {
  private static readonly apiKey: string = <string>process.env.API_KEY;
  private static yelp: any;
  private static client: any;

  public static initialize() {
    this.yelp = require('yelp-fusion');
    this.client = this.yelp.client(this.apiKey);
  }

  public static Test(): Promise<string> {
    const searchRequest: IBusinessSearchConfig = {
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
      .then((response: any) => {
        const businesses = response?.jsonBody?.businesses;
        console.log(JSON.stringify(businesses));
        return JSON.stringify(businesses);
      })
      .catch((error: Error) => {
        console.error(error);
        throw error; // Optional: Rethrow the error to be handled by the calling code
      });
  }
}

YelpUtil.initialize();

export default YelpUtil;
