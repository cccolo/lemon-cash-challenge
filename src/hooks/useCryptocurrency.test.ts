import {useInfiniteQuery} from '@tanstack/react-query';
import {renderHook} from '@testing-library/react-hooks';
import {useCryptocurrency} from './useCryptocurrency';

jest.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: jest.fn(),
}));

describe('useCryptocurrency', () => {
  const mockData = {
    pages: [
      {
        data: [
          {id: 1, name: 'Bitcoin', symbol: 'BTC'},
          {id: 2, name: 'Ethereum', symbol: 'ETH'},
        ],
      },
      {
        data: [{id: 3, name: 'Ripple', symbol: 'XRP'}],
      },
    ],
  };

  it('should return flattened cryptocurrency data', async () => {
    (useInfiniteQuery as jest.Mock).mockImplementation(() => ({
      data: mockData,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
    }));

    const {result, waitFor} = renderHook(() => useCryptocurrency());

    await waitFor(
      () => result.current.cryptocurrencyInfiniteQuery.data.length > 0,
    );

    expect(result.current.cryptocurrencyInfiniteQuery.data).toEqual([
      {id: 1, name: 'Bitcoin', symbol: 'BTC'},
      {id: 2, name: 'Ethereum', symbol: 'ETH'},
      {id: 3, name: 'Ripple', symbol: 'XRP'},
    ]);
  });

  it('should handle empty data correctly', async () => {
    (useInfiniteQuery as jest.Mock).mockImplementation(() => ({
      data: {pages: []},
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
    }));

    const {result, waitFor} = renderHook(() => useCryptocurrency());

    await waitFor(() => !result.current.cryptocurrencyInfiniteQuery.isLoading);

    expect(result.current.cryptocurrencyInfiniteQuery.data).toEqual([]);
  });
});
