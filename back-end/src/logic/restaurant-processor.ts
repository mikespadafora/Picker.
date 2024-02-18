import { Restaurant } from './parser-util';
const Fuse = require('fuse.js');

export default class RestaurantProcessor {
  private options: Object = {
    includeScore: true,
    keys: ['name', 'categories.title'],
    findAllMatches: true,
  };
  private restaurants: Restaurant[] = [];
  private fuse: any;

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants;
    this.fuse = new Fuse(this.restaurants, this.options);
  }

  public filterResults(keywords: string[]): Restaurant[] {
    console.log(keywords);
    const results: { item: Restaurant }[][] = keywords.map((keyword) =>
      this.fuse.search(keyword.toLowerCase()),
    );
    const mergedResults: Restaurant[] = results.flat().map((obj) => obj.item);

    if (mergedResults.length) {
      const trimmedResults = this.removeDuplicateResults(mergedResults);
      return trimmedResults;
    }
    return [];
  }

  private removeDuplicateResults(originalResults: Restaurant[]): Restaurant[] {
    const uniqueIds = new Set();
    const uniqueResults: Restaurant[] = [];

    originalResults.forEach((restaurant) => {
      if (!uniqueIds.has(restaurant.id)) {
        uniqueResults.push(restaurant);
        uniqueIds.add(restaurant.id);
      }
    });

    console.log(originalResults.length);
    console.log(uniqueResults.length);
    return uniqueResults;
  }
}
