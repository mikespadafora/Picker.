import { Request, Response } from 'express';
import ARoutes from './routes';
import YelpUtil from '../../data/yelpUtil';
import ParserUtil from '../../logic/parserUtil';
import { BusinessSearchConfig } from '../../data/dataInterfaces';

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
            term: 'restaurants',
            categories: req.query.categories as string,
            locale: 'en_US',
            open_now: true,
            sort_by: 'best_match',
            limit: 50,
          };
          console.log(config);

          const payload: JSON = await YelpUtil.search(config);
          const parsed: Object[] = await ParserUtil.parse(payload);
          res.send(payload);
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
  }
}

export default new MainRoutes().router;
