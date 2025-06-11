import goToPage from './pages.js';
import { DEFAULT_EXTRACTOR } from '../config/extractors.js';

export default async function proxyScrapper(url, page, extractor = DEFAULT_EXTRACTOR){
  await goToPage(url, page);

  const proxies = await extractor(page);
  return proxies;
}