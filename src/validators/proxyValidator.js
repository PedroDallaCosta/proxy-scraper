import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';

export default async function isProxyWorking({ip = '', port = 0}, timeout = 5000) {
  const proxyUrl = `socks5://${ip}:${port}`;
  const agent = new SocksProxyAgent(proxyUrl);

  const VALIDATION_URL = process.env.VALIDATION_URL;
  const PROXY_TIMEOUT = process.env.PROXY_TIMEOUT;
  
  try {
    const response = await axios.get(VALIDATION_URL, {
      httpAgent: agent,
      httpsAgent: agent,
      timeout: parseInt(PROXY_TIMEOUT),
    });

    return response.status === 200;
  } catch (_) {
    return false;
  }
}