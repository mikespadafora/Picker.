import { IBusinessSearchConfig } from './dataInterfaces';

class YelpUtil {
  private static readonly token: string = <string>process.env.API_KEY;

  public static GetRestaurants(): string {
    return this.token;
  }
}

export default YelpUtil;
