import express, { Express } from 'express';
import mainRoutes from './routes/mainRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const cors = require('cors');

// Middleware (if any), e.g., for parsing request bodies
app.use(express.json());
app.use(cors());

// Set routes
app.use('/', mainRoutes);

// Export the app for serverless function use
export default app;
