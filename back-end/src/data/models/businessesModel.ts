import { IBusiness, IBusinessesResponse } from '../dataInterfaces';

class BusinessesModel implements IBusinessesResponse {
  public businesses: IBusiness[];

  constructor() {
    this.businesses = new Array<IBusiness>();
  }
}

export default BusinessesModel;
