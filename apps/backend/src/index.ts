import { app } from './server';

const serverPort = 3001;

app.listen(serverPort, () => {
  console.log(`Listening on ${serverPort}`);
});

process.on('SIGINT', function () {
  process.exit();
});
