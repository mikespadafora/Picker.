export interface BusinessSearchConfig {
  latitude: number;
  longitude: number;
  radius: number;
  categories: string;
  open_now: boolean;
  price: string;
}

export interface IBusiness {
  name: string;
}

export interface IBusinessesResponse {
  businesses: Array<IBusiness>;
}

export interface IBusiness {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: ICategory[];
  rating: number;
  coordinates: ICoordinates;
  transactions: string[];
  price: string;
  location: ILocation;
  phone: string;
  display_phone: string;
  distance: number;
}

export interface ICategory {
  alias: string;
  title: string;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface ILocation {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}
