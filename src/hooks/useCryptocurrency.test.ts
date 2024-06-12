import {renderHook} from '@testing-library/react-hooks';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useCryptocurrency} from './useCryptocurrency';

jest.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: jest.fn(),
}));

describe('useCryptocurrency', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call useInfiniteQuery with the correct arguments', () => {
    renderHook(() => useCryptocurrency());

    expect(useInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['cryptocurrency', 'listings'],
        queryFn: expect.any(Function),
        initialPageParam: 1,
        getNextPageParam: expect.any(Function),
      }),
    );
  });

  test('Should return the query correctly', () => {
    const expectedResult = {
      data: [
        {
          id: 1,
          name: 'Bitcoin',
          symbol: 'BTC',
        },
        {
          id: 2,
          name: 'Ethereum',
          symbol: 'ETH',
        },
      ],
      hasNextPage: true,
      isError: false,
      isFetchingNextPage: false,
      isLoading: false,
    };

    useInfiniteQuery.mockReturnValueOnce(expectedResult);

    const {result} = renderHook(() => useCryptocurrency());

    expect(result.current.cryptocurrencyInfiniteQuery).toEqual(expectedResult);
  });

  test('Should return the query as undefined if not initialized', () => {
    useInfiniteQuery.mockReturnValueOnce(undefined);

    const {result} = renderHook(() => useCryptocurrency());

    expect(result.current.cryptocurrencyInfiniteQuery).toBeUndefined();
  });
});
