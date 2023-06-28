import { IBusinessSearchConfig } from './dataInterfaces';

class YelpUtil {
  private static readonly apiKey: string = <string>process.env.API_KEY;
  private static yelp: any;
  private static client: any;

  public static initialize() {
    this.yelp = require('yelp-fusion');
    this.client = this.yelp.client(this.apiKey);
  }

  public static Test(): void {
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

    this.client
      .search(searchRequest)
      .then((response: any) => {
        console.log(JSON.stringify(response?.jsonBody?.businesses));
        return JSON.stringify(response?.jsonBody?.businesses);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }
}

YelpUtil.initialize();

export default YelpUtil;
