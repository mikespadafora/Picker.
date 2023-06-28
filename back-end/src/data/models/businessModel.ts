import {
  ICoordinates,
  IBusiness,
  ICategory,
  ILocation,
} from '../dataInterfaces';

class BusinessModel implements IBusiness {
  name: string = '';
  id: string = '';
  alias: string = '';
  image_url: string = '';
  is_closed: boolean = false;
  url: string = '';
  review_count: number = 0;
  categories: ICategory[] = [];
  rating: number = 0;
  coordinates: ICoordinates = new Coordinates();
  transactions: string[] = [];
  price: string = '';
  location: ILocation = new Location();
  phone: string = '';
  display_phone: string = '';
  distance: number = 0;
}

export class Coordinates implements ICoordinates {
  latitude: number = 0;
  longitude: number = 0;
}

export class Location implements ILocation {
  address1: string = '';
  address2: string = '';
  address3: string = '';
  city: string = '';
  zip_code: string = '';
  country: string = '';
  state: string = '';
  display_address: string[] = [];
}

export default BusinessModel;
