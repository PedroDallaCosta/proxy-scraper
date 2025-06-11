import dotenv from 'dotenv';
import logger from '../src/utils/logger.js';

dotenv.config();

import run from '../src/index.js';

run().then(proxies => {
  logger.info(`[PROXYS] Find ${proxies.length} proxys`);
});