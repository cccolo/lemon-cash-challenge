import {renderHook} from '@testing-library/react-hooks';
import {useQuery} from '@tanstack/react-query';
import {useCryptocurrencyById} from './useCryptocurrencyById';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('useCryptocurrencyById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call useQuery with correct arguments when enabled is true and value is provided', () => {
    const value = 1;
    const enabled = true;
    const refetchIntervalEnabled = false;

    renderHook(() =>
      useCryptocurrencyById(value, enabled, refetchIntervalEnabled),
    );

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['cryptocurrency', 'listings', 'id', value],
      queryFn: expect.any(Function),
      enabled: true,
      refetchInterval: false,
    });
  });

  it('should call useQuery with correct arguments when enabled is true, value is provided, and refetchIntervalEnabled is true', () => {
    const value = 1;
    const enabled = true;
    const refetchIntervalEnabled = true;

    renderHook(() =>
      useCryptocurrencyById(value, enabled, refetchIntervalEnabled),
    );

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['cryptocurrency', 'listings', 'id', value],
      queryFn: expect.any(Function),
      enabled: true,
      refetchInterval: 30000,
    });
  });

  it('should call useQuery with correct arguments when enabled is false', () => {
    const value = 1;
    const enabled = false;
    const refetchIntervalEnabled = false;

    renderHook(() =>
      useCryptocurrencyById(value, enabled, refetchIntervalEnabled),
    );

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['cryptocurrency', 'listings', 'id', value],
      queryFn: expect.any(Function),
      enabled: false,
      refetchInterval: false,
    });
  });
});
