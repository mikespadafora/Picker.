import { Request, Response } from 'express';
import ARoutes from './routes';
import YelpUtil from '../../data/yelpUtil';

class MainRoutes extends ARoutes {
  constructor() {
    super();
  }

  public override routes() {
    this.router.get('/', async (req: Request, res: Response) => {
      try {
        let payload: string = await YelpUtil.Test();
        res.send(payload);
      } catch (error) {
        // Handle any errors that occurred during YelpUtil.Test()
        res.status(500).send('Internal Server Error');
      }
    });
  }
}

export default new MainRoutes().router;
