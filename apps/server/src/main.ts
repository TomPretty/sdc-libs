import { getApp } from './server';

const app = getApp({
  getBannerTests: () =>
    Promise.resolve([
      {
        name: 'AUS_MOMENT_TEST',
        copy: { header: 'This is a banner', body: 'Give us lots of money' },
      },
    ]),
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
