import { version } from '../../package.json';

export default {
  environment: process.env.ENVIRONMENT || 'dev',
  isDev: process.env.ENVIRONMENT === 'dev' || process.env.ENVIRONMENT === 'DEV',
  version,
};
