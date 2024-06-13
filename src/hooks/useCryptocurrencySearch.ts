import {useQueries} from '@tanstack/react-query';
import {coinMarketCapAPi} from '../api/coinMarketCapAPi';
import {Cryptocurrency} from '../intefaces';
import {flatData} from '../commons/utils';
import React from 'react';

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
    `v2/cryptocurrency/quotes/latest?slug=${value.toLocaleLowerCase()}`,
  );

  return data;
};

export const useCryptocurrencySearch = (value: string) => {
  const cryptocurrencyQueries = useQueries({
    queries: [
      {
        queryKey: ['cryptocurrency', 'listings', {symbol: value}],
        queryFn: async () => await getCryptocurrencyBySymbol(value),
        select: (data: Cryptocurrency) => flatData(data?.data),
        retry: false,
        enabled: !!value,
      },
      {
        queryKey: ['cryptocurrency', 'listings', {slug: value}],
        queryFn: async () => await getCryptocurrencyBySlug(value),
        select: (data: Cryptocurrency) => flatData(data?.data),
        retry: false,
        enabled: !!value,
      },
    ],
  });

  const [cryptocurrencyBySymbolQuery, cryptocurrencyBySlugQuery] =
    cryptocurrencyQueries;

  const flatCryptocurrencyData = React.useMemo(() => {
    const bySymbol = cryptocurrencyBySymbolQuery?.data || [];
    const bySlug = cryptocurrencyBySlugQuery?.data || [];
    const combinedData = [...bySymbol, ...bySlug];
    const uniqueData = combinedData.filter(
      (item, index, self) => index === self.findIndex(({id}) => id === item.id),
    );
    return uniqueData;
  }, [cryptocurrencyBySlugQuery.data, cryptocurrencyBySymbolQuery.data]);

  return {
    cryptocurrencySearch: {
      ...cryptocurrencyBySlugQuery,
      data: flatCryptocurrencyData,
      isError:
        cryptocurrencyBySymbolQuery.isError &&
        cryptocurrencyBySlugQuery.isError,
      isFetching:
        cryptocurrencyBySlugQuery.isFetching ||
        cryptocurrencyBySymbolQuery.isFetching,
    },
  };
};
