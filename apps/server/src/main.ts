import { getApp } from './server';

const app = getApp({
  getHeaderTests: () =>
    Promise.resolve([
      {
        name: 'AUS_MOMENT_HEADER_TEST',
        targeting: {
          edition: 'AU',
        },
        copy: 'This is a header',
      },
    ]),
  getBannerTests: () =>
    Promise.resolve([
      {
        name: 'AUS_MOMENT_TEST',
        isOn: false,
        targeting: {
          edition: 'AU',
          articleCountSettings: {
            min: 5,
            max: 50,
          },
        },
        copy: { header: 'This is a banner', body: 'Give us lots of money' },
      },
    ]),
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
