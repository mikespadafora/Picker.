import { Request, Response } from 'express';
import ARoutes from './routes';
import YelpUtil from '../../data/yelpUtil';

class MainRoutes extends ARoutes {
  constructor() {
    super();
  }

  public override routes() {
    this.router.get('/', (req: Request, res: Response) => {
      res.send(YelpUtil.GetRestaurants());
    });
  }
}

export default new MainRoutes().router;
