import {renderHook} from '@testing-library/react-hooks';
import {useQueries} from '@tanstack/react-query';
import {useCryptocurrencySearch} from './useCryptocurrencySearch';
import {flatData} from '../commons/utils';

jest.mock('@tanstack/react-query', () => ({
  useQueries: jest.fn(),
}));

jest.mock('../api/coinMarketCapAPi', () => ({
  coinMarketCapAPi: {
    get: jest.fn(),
  },
}));

jest.mock('../commons/utils', () => ({
  flatData: jest.fn(),
}));

describe('useCryptocurrencySearch', () => {
  const flatMockData = [
    {id: 1, name: 'Bitcoin', symbol: 'BTC'},
    {id: 2, name: 'Ethereum', symbol: 'ETH'},
  ];

  beforeEach(() => {
    (flatData as jest.Mock).mockImplementation(data => data);
  });

  it('should return combined and unique data from symbol and slug queries', async () => {
    (useQueries as jest.Mock).mockImplementation(() => [
      {
        data: flatMockData,
        isFetching: false,
        isError: false,
      },
      {
        data: [],
        isFetching: false,
        isError: false,
      },
    ]);

    const {result, waitFor} = renderHook(() => useCryptocurrencySearch('BTC'));

    await waitFor(() =>
      expect(result.current.cryptocurrencySearch.data).toHaveLength(2),
    );

    expect(result.current.cryptocurrencySearch.data).toEqual(flatMockData);
  });

  it('should handle errors correctly', async () => {
    (useQueries as jest.Mock).mockImplementation(() => [
      {
        data: [],
        isFetching: false,
        isError: true,
      },
      {
        data: [],
        isFetching: false,
        isError: true,
      },
    ]);

    const {result, waitFor} = renderHook(() => useCryptocurrencySearch('BTC'));

    await waitFor(() =>
      expect(result.current.cryptocurrencySearch.isError).toBe(true),
    );
  });

  it('should handle fetching state correctly', async () => {
    (useQueries as jest.Mock).mockImplementation(() => [
      {
        data: [],
        isFetching: true,
        isError: false,
      },
      {
        data: [],
        isFetching: false,
        isError: false,
      },
    ]);

    const {result, waitFor} = renderHook(() => useCryptocurrencySearch('BTC'));

    await waitFor(() =>
      expect(result.current.cryptocurrencySearch.isFetching).toBe(true),
    );
  });
});
