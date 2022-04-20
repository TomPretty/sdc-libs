import { HeaderRequest } from '@sdc-libs/types';
import * as express from 'express';

const app = express();

app.post('/header', express.json(), (req, res) => {
  const body = req.body as HeaderRequest;

  console.log({ body });

  res.status(203).json({ header: 'Thank you' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
