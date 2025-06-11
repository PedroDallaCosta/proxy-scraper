import { FIRST_EXTRACTOR, SECOND_EXTRACTOR } from './extractors.js';

const BASE_URLS = [
  { 
    index: [30, 60, 90, 120],
    baseUrl: 'https://proxydb.net/?protocol=socks5&offset={offset}',
  },
  { 
    index: [1, 2, 3, 4, 5],
    baseUrl: 'https://www.freeproxy.world/?type=socks5&anonymity=&country=&speed=1500&port=&page={offset}',
  },
  {
    url: 'https://advanced.name/freeproxy?type=socks5',
    extractor: FIRST_EXTRACTOR
  },
  {
    url: 'https://spys.one/en/socks-proxy-list/',
    extractor: SECOND_EXTRACTOR
  }
];

export default BASE_URLS.flatMap(item => {
  if (item.url) {
    return {
      url: item.url,
      extractor: item.extractor
    };
  } else {
    return item.index.map(offset => {
      return {
        url: item.baseUrl.replace('{offset}', offset),
        extractor: item.extractor
      };
    });
  }
});