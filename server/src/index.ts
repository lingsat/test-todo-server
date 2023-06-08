import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import taskRouter from './routers/taskRouter.js';
import 'dotenv/config';

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(`${process.env.MONGO_DB_URL}`);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_, res) => res.json({ message: 'Hello World' }));
app.use('/api/task', taskRouter);

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
