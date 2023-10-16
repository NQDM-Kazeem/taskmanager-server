import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
// A constructor function that creates the connection with the DB to be connected with;
import { DataSource } from 'typeorm';

import { Task } from './src/tasks/tasks.entity';
import { taskRouter } from './src/tasks/routers/taskRouters';

// Instantiate express app
const server: Express = express();
dotenv.config();

// Parse the request body
server.use(bodyParser.json());

// User cors for cors error
server.use(cors());

// Create Database connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

// Define server port
const PORT = process.env.PORT;

// Initial Datasource
AppDataSource.initialize()
  .then(() => {
    // Start listening to requests on defined port
    server.listen(PORT);
    console.log('Datasource Initialzed');
  })
  .catch((err) => {
    console.log('Error initializing datasoource: ', err);
  });

server.use('/', taskRouter);
