import {renderHook} from '@testing-library/react-hooks';
import {useCryptocurrencySearch} from './useCryptocurrencySearch';
import {useQueries} from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  useQueries: jest.fn(),
}));

describe('useCryptocurrencySearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call useQueries with correct arguments when value is provided', () => {
    const value = 'BTC';
    renderHook(() => useCryptocurrencySearch(value));

    expect(useQueries).toHaveBeenCalledWith({
      queries: [
        {
          queryKey: ['cryptocurrency', 'listings', 'symbol', value],
          queryFn: expect.any(Function),
          enabled: true,
        },
        {
          queryKey: ['cryptocurrency', 'listings', 'slug', value],
          queryFn: expect.any(Function),
          enabled: true,
        },
      ],
    });
  });

  it('should call useQueries with correct arguments when value is not provided', () => {
    renderHook(() => useCryptocurrencySearch(''));

    expect(useQueries).toHaveBeenCalledWith({
      queries: [
        {
          queryKey: ['cryptocurrency', 'listings', 'symbol', ''],
          queryFn: expect.any(Function),
          enabled: false,
        },
        {
          queryKey: ['cryptocurrency', 'listings', 'slug', ''],
          queryFn: expect.any(Function),
          enabled: false,
        },
      ],
    });
  });
});
