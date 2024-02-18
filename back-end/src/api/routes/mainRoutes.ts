import { Request, Response } from 'express';
import ARoutes from './routes';
import YelpUtil from '../../data/yelpUtil';
import { BusinessSearchConfig } from '../../data/dataInterfaces';
import {
  ParserUtil,
  Restaurant,
  ParsedRestaurant,
} from '../../logic/parser-util';
import RestaurantProcessor from '../../logic/restaurant-processor';

class MainRoutes extends ARoutes {
  constructor() {
    super();
  }

  public override routes() {
    this.router.get('/search', async (req: Request, res: Response) => {
      try {
        const categories: string = req.query.categories as string;

        console.log('Open Now: ', req.query.open_now);

        const config: BusinessSearchConfig = {
          latitude: Number(req.query.latitude),
          longitude: Number(req.query.longitude),
          radius: Number(req.query.radius),
          categories: categories,
          open_now: Boolean(req.query.open_now === 'true'),
          price: req.query.price as string,
        };

        console.log(config);

        const payload: Restaurant[] = await YelpUtil.search(config);

        //console.log('payload', payload);
        // implement filtering algo

        const proc = new RestaurantProcessor(payload);
        const r: Restaurant[] = proc.filterResults(
          categories.includes(',')
            ? (req.query.categories as string).split(',')
            : [categories],
        );

        const parsed: ParsedRestaurant[] = ParserUtil.parseRestaurant(r);
        console.log('Original:\n', payload);
        console.log('Parsed:\n', r);
        res.send(parsed);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
  }
}

export default new MainRoutes().router;
