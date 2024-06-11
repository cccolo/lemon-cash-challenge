import {useQuery} from '@tanstack/react-query';
import {coinMarketCapAPi} from '../api/coinMarketCapAPi';
import {Cryptocurrency} from '../intefaces';

const getCryptocurrencyById = async (
  value: string,
): Promise<Cryptocurrency> => {
  const {data} = await coinMarketCapAPi.get<Cryptocurrency>(
    `v2/cryptocurrency/quotes/latest?id=${value}`,
  );

  return data;
};

export const useCryptocurrencyFavoriteSearch = (
  value: string,
  enabled = false,
) => {
  const cryptocurrencyFavoriteQuery = useQuery({
    queryKey: ['cryptocurrency', 'listings', 'id', value],
    queryFn: async () => await getCryptocurrencyById(value),
    enabled: enabled && !!value,
  });

  return {
    cryptocurrencyFavoriteQuery,
  };
};
