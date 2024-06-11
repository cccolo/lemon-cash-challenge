import {useQueries} from '@tanstack/react-query';
import {coinMarketCapAPi} from '../api/coinMarketCapAPi';
import {Cryptocurrency} from '../intefaces';

const getCryptocurrencyBySymbol = async (
  value: string,
): Promise<Cryptocurrency> => {
  const {data} = await coinMarketCapAPi.get<Cryptocurrency>(
    `v2/cryptocurrency/quotes/latest?symbol=${value}`,
  );

  return data;
};

const getCryptocurrencyBySlug = async (
  value: string,
): Promise<Cryptocurrency> => {
  const {data} = await coinMarketCapAPi.get<Cryptocurrency>(
    `v2/cryptocurrency/quotes/latest?slug=${value}`,
  );

  return data;
};

export const useCryptocurrencySearch = (value: string) => {
  const cryptocurrencyQueries = useQueries({
    queries: [
      {
        queryKey: ['cryptocurrency', 'listings', 'symbol', value],
        queryFn: async () => await getCryptocurrencyBySymbol(value),
        enabled: !!value,
      },
      {
        queryKey: ['cryptocurrency', 'listings', 'slug', value],
        queryFn: async () =>
          await getCryptocurrencyBySlug(value.toLocaleLowerCase()),
        enabled: !!value,
      },
    ],
  });

  return {
    cryptocurrencyQueries,
  };
};
