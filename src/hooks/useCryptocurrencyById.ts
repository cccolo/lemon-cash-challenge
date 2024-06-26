import {useQuery} from '@tanstack/react-query';
import {coinMarketCapAPi} from '../api/coinMarketCapAPi';
import {Cryptocurrency} from '../intefaces';
import {flatData} from '../commons/utils';

const getCryptocurrencyById = async (
  value: string | number,
): Promise<Cryptocurrency> => {
  const {data} = await coinMarketCapAPi.get<Cryptocurrency>(
    `v2/cryptocurrency/quotes/latest?id=${value}`,
  );

  return data;
};

export const useCryptocurrencyById = (
  value: string | number,
  enabled = false,
  refetchIntervalEnabled = false,
) => {
  const cryptocurrencyByIdQuery = useQuery({
    queryKey: ['cryptocurrency', 'listings', {id: value}],
    queryFn: async () => await getCryptocurrencyById(value),
    select: (data: Cryptocurrency) => flatData(data?.data),
    enabled: enabled && !!value,
    refetchInterval: refetchIntervalEnabled && 30000,
  });

  return {
    cryptocurrencyByIdQuery,
  };
};
