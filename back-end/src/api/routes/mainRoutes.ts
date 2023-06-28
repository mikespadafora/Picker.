import { Request, Response } from 'express';
import ARoutes from './routes';

class MainRoutes extends ARoutes {
  constructor() {
    super();
  }

  public override routes() {
    this.router.get('/', (req: Request, res: Response) => {
      res.send('Hello, World!');
    });
  }
}

export default new MainRoutes().router;
