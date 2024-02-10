import Server from './api/server';

const server = new Server(3000);

if (server instanceof Server) {
  server.start();
}
