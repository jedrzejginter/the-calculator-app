import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { router } from './feature/calculator';

const serverPort = 3001;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/calculate', router);

app.use('*', (_req, res) => {
  res.status(404).end();
});

app.listen(serverPort, () => {
  console.log(`Listening on ${serverPort}`);
});

process.on('SIGINT', function () {
  process.exit();
});
