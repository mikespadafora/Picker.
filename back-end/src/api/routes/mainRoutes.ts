import { Request, Response } from 'express';
import ARoutes from './routes';
import YelpUtil from '../../data/yelpUtil';
import { BusinessSearchConfig } from '../../data/dataInterfaces';

import {
  ParserUtil,
  Restaurant,
  ParsedRestaurant,
} from '../../logic/parser-util';

class MainRoutes extends ARoutes {
  constructor() {
    super();
  }

  public override routes() {
    this.router.get('/search', async (req: Request, res: Response) => {
      try {
        if (req.query) {
          let config: BusinessSearchConfig = {
            latitude: Number(req.query.latitude),
            longitude: Number(req.query.longitude),
            radius: Number(req.query.radius),
            categories: req.query.categories as string,
            open_now: Boolean(req.query.open_now),
            price: req.query.price as string,
          };

          console.log(config);

          const payload: Restaurant[] = await YelpUtil.search(config);

          //console.log('payload', payload);

          const parsed: ParsedRestaurant[] =
            ParserUtil.parseRestaurant(payload);

          //console.log('parsed', parsed);
          res.send(parsed);
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
  }
}

export default new MainRoutes().router;
