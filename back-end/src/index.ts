import Server from './api/server';
import dotenv from 'dotenv';

dotenv.config();

const server = new Server(3000);

if (server instanceof Server) {
  server.start();
}
