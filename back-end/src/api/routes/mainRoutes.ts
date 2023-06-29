import { Request, Response } from 'express';
import ARoutes from './routes';
import YelpUtil from '../../data/yelpUtil';
import ParserUtil from '../../logic/parserUtil';
import { IBusinessSearchConfig } from '../../data/dataInterfaces';

class MainRoutes extends ARoutes {
  constructor() {
    super();
  }

  public override routes() {
    /* this.router.get('/', async (req: Request, res: Response) => {
      try {
        let payload: JSON = await YelpUtil.Test();
        let parsed: Object[] = await ParserUtil.parse(payload);
        res.send(JSON.stringify(parsed[0]));
      } catch (error) {
        // Handle any errors that occurred during YelpUtil.Test()
        res.status(500).send('Internal Server Error');
      }
    }); */

    this.router.get('/search', async (req: Request, res: Response) => {
      try {
        if (req.query) {
          let config: IBusinessSearchConfig = {
            latitude: Number(req.query.latitude),
            longitude: Number(req.query.longitude),
            radius: Number(req.query.radius),
            term: 'restaurants',
            categories: req.query.categories as string,
            locale: 'en_US',
            open_now: true,
            sort_by: 'best_match',
            limit: 30,
          };

          let payload: JSON = await YelpUtil.search(config);
          let parsed: Object[] = await ParserUtil.parse(payload);
          res.send(parsed);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      }
    });
  }
}

export default new MainRoutes().router;
