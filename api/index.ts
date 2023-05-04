import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connection } from './database'
import api from './src/routes/api';
import cors from 'cors';

dotenv.config();
connection();

const app: Express = express();

const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/', (req: Request, res: Response) => {
  res.send('API');
});

app.use(cors());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});