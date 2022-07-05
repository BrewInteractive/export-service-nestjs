export default () => ({
  environment: process.env.ENVIRONMENT || 'dev',
  port: process.env.PORT || 3000,
  isDev:
    process.env.ENVIRONMENT === 'dev' ||
    process.env.ENVIRONMENT === undefined ||
    process.env.ENVIRONMENT === null ||
    process.env.ENVIRONMENT == '',
  version: '1.0.0',
  apiKey: process.env.API_KEY,
  cors: process.env.CORS,
  puppeteer: {
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  },
});
