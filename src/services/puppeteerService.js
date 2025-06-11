import puppeteer from 'puppeteer';
import options from '../config/puppeteer.js';
import logger from '../utils/logger.js';

/**
 * Initializes and returns an instance of the Puppeteer browser
 * @returns {Promise<Browser|boolean>} Browser instance or false in case of error
 */
export default async function launchPuppeteer() {
  try {
    const headless = process.env.HEADLESS === 'true';

    const browser = await puppeteer.launch({
      headless,
      args: options,
    });

    logger.info('[PUPPETEER] Browser initialized successfully :)');
    return browser;
  } catch (error) {
    logger.error(`[PUPPETEER] Failed to initialize Puppeteer: ${error.message}\n${error.stack}`);
    return false;
  }
}