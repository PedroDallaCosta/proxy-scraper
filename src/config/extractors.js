export const DEFAULT_EXTRACTOR = async (page) => {
  await page.waitForSelector('table');

  const proxies = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table tbody tr'));
    const list = [];

    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 2) {
        const ip = cells[0].innerText.trim();
        const port = cells[1].innerText.trim();
        if (ip && port) {
          list.push({ ip: ip.trim(), port: Number(port.trim()) });
        }
      }
    });

    return list;
  });

  return proxies;
};

export const FIRST_EXTRACTOR = async (page) => {
  await page.waitForSelector('table');

  const proxies = await page.evaluate(() => {
    function decodeBase64(str) {
      try {
        return atob(str);
      } catch (_) {
        return null;
      }
    }

    const rows = Array.from(document.querySelectorAll('tbody tr'));
    const proxyList = [];

    rows.forEach(row => {
      const ipEncoded = row.querySelector('td[data-ip]');
      const portEncoded = row.querySelector('td[data-port]');

      if (ipEncoded && portEncoded) {
        const ip = decodeBase64(ipEncoded.getAttribute('data-ip'));
        const port = decodeBase64(portEncoded.getAttribute('data-port'));

        if (ip && port) {
          proxyList.push({ ip: ip.trim(), port: Number(port.trim()) });
        }
      }
    });

    return proxyList;
  });

  return proxies;
};

export const SECOND_EXTRACTOR = async (page) => {
  await page.waitForSelector('table');

  const proxies = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tr.spy1x, tr.spy1xx'));
    const proxyList = [];

    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length > 0) {
        const ipPortText = cells[0].innerText.trim();
        if (ipPortText.includes(':')) {
          const [ip, port] = ipPortText.split(':');

          if (ip && port) {
            proxyList.push({ ip: ip.trim(), port: Number(port.trim()) });
          }
        }
      }
    });

    return proxyList;
  });

  return proxies;
};