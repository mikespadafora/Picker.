export interface IBusinessSearchConfig {
  latitude: number;
  longitude: number;
  radius: number;
  term: string;
  categories: string;
  locale: string;
  open_now: false;
  sort_by: string;
  limit: number;
}
