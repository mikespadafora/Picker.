import express, { Express } from 'express';
import mainRoutes from './routes/mainRoutes';

class Server {
  public app: Express;
  private port: number;
  private hostname: string;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    //this.hostname = process.env.HOSTNAME as string;
    this.hostname = 'localhost';
    this.setRoutes();
  }

  private setRoutes(): void {
    this.app.use('/', mainRoutes);
    // Add more routes here.
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://${this.hostname}:${this.port}`);
      //console.log(`Server is running at https://${this.hostname}:${this.port}`);
    });
  }
}

export default Server;
