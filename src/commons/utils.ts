import {CryptocurrencyData} from '../intefaces';

export const flatData = (data?: CryptocurrencyData[]) =>
  data ? Object.values(data).flat() : [];
