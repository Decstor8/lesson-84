import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import config from "./config";
import usersRouter from './router/users';
import tasksRouter from './router/tasks';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

const run = async () => {
  await  mongoose.connect(config.mongoose.db)
  app.listen(port, () => {
    console.log(`сервер стартовал на ${port} порту`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();