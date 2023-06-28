import { Router, Request, Response } from 'express';

interface IMainRoutes {
  router: Router;
  routes: () => void;
}

abstract class ARoutes implements IMainRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public abstract routes(): void;
}

export default ARoutes;
