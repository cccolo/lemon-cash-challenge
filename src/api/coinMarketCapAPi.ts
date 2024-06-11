import axios from 'axios';
import {COIN_MARKET_CAP_API_KEY} from '@env';

export const coinMarketCapAPi = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com',
  headers: {
    'X-CMC_PRO_API_KEY': COIN_MARKET_CAP_API_KEY,
  },
});
