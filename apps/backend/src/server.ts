import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { router } from './feature/calculator';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/calculate', router);

app.use('*', (_req, res) => {
  res.status(404).end();
});

export { app };
