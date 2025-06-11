import proxyScrapper from './scrapers/proxyScraper.js';
import launchPuppeteer from './services/puppeteerService.js';
import isProxyWorking from './validators/proxyValidator.js';
import saveProxies from './storage/store.js';
import URLS from './config/urls.js';

export default async function run() {
  const allProxies = new Map();

  const browser = await launchPuppeteer();
  await Promise.all(
    URLS.map(async ({ url, extractor }) => {
      const page = await browser.newPage();
      const proxies = await proxyScrapper(url, page, extractor);

      await Promise.all(
        proxies.map(async (proxy) => {
          const key = `${proxy.ip}:${proxy.port}`;
          if (!allProxies.has(key) && proxy.ip && proxy.port) {
            const isValid = await isProxyWorking(proxy);
            if (isValid) allProxies.set(key, proxy);
          }
        })
      );

      await page.close();
    })
  );

  await browser.close();
  saveProxies(allProxies);
  
  return Array.from(allProxies.values());
};