import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import taskRouter from './routers/taskRouter.js';
import path from 'path';
import 'dotenv/config';

// Create Server
const app = express();

// Connect to MongoDb
mongoose.set('strictQuery', false);
mongoose.connect(`${process.env.MONGO_DB_URL}`);

// Cors / Body Parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Return Web page
const __dirname = path.resolve();
app.use(express.static('public'));
app.get('/', (_, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

// Api Routes
app.use('/api/task', taskRouter);

// Start Server
const port = process.env.PORT || 4200;
const start = async () => {
  try {
    app.listen(port);
    console.log(`Server started on port ${port}`);
  } catch (error: unknown) {
    console.error(`Error on server startup: ${(error as Error).message}`);
  }
};
start();
