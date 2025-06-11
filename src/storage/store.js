import fs from 'fs';
import logger from '../utils/logger.js';

/**
 * Saves the validated proxies to a JSON file
 * @param {Map} proxies - Map containing validated proxies
 * @param {string} [filename='proxies.json'] - Output filename
 * @returns {boolean} - Success status
 */
export default function saveProxies(proxys){
  try {
    fs.writeFileSync('proxies.json', JSON.stringify(Array.from(proxys.values()), null, 2));
    logger.info('[STORE] File saved successfully :)');
  } catch ( error ){
    logger.error(`[STORE] Failed to save file: ${error.message}\n${error.stack}`);
  }
}