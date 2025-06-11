import logger from '../utils/logger.js';

export default async function goToPage(url, page){
  try {
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)...');
    await page.goto(url, { waitUntil: 'networkidle2' });
  } catch ( error ){
    logger.error(`[PAGES] Failed to load page(${url}): ${error.message}\n${error.stack}`);
  }
}