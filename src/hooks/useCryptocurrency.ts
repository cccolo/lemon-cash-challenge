import {useInfiniteQuery} from '@tanstack/react-query';
import {coinMarketCapAPi} from '../api/coinMarketCapAPi';
import {Cryptocurrency, CryptocurrencyData} from '../intefaces';
import React from 'react';

interface QueryProps {
  pageParam: number;
}

const LIMIT_SIZE = 20;

const getCryptocurrencyList = async ({
  pageParam,
}: QueryProps): Promise<Cryptocurrency> => {
  const {data} = await coinMarketCapAPi.get<Cryptocurrency>(
    `/v1/cryptocurrency/listings/latest?start=${
      pageParam * LIMIT_SIZE
    }&limit=${LIMIT_SIZE}`,
  );

  return data;
};

export const useCryptocurrency = () => {
  const cryptocurrencyInfiniteQuery = useInfiniteQuery({
    queryKey: ['cryptocurrency', 'listings'],
    queryFn: getCryptocurrencyList,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.length === 0) {
        return;
      }
      return pages.length + 1;
    },
  });

  const flatCryptocurrencyInifity: CryptocurrencyData[] = React.useMemo(
    () =>
      cryptocurrencyInfiniteQuery?.data?.pages.flatMap(
        (page: Cryptocurrency) => page.data,
      ) || [],
    [cryptocurrencyInfiniteQuery?.data],
  );

  return {
    cryptocurrencyInfiniteQuery: {
      ...cryptocurrencyInfiniteQuery,
      data: flatCryptocurrencyInifity,
    },
  };
};
