import express, { Express } from 'express';
import mainRoutes from './routes/mainRoutes';

class Server {
  public app: Express;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.setRoutes();
  }

  private setRoutes(): void {
    this.app.use('/', mainRoutes);
    // Add more routes here.
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }
}

export default Server;