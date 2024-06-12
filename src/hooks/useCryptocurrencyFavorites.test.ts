import {renderHook, act} from '@testing-library/react-hooks';
import {useCryptocurrencyFavorites} from './useCryptocurrencyFavorites';
import {setData, getData} from '../commons/asyncStorage';

jest.mock('../commons/asyncStorage', () => ({
  setData: jest.fn(),
  getData: jest.fn(),
}));

describe('useCryptocurrencyFavorites', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set favorite item correctly when item is not already a favorite', async () => {
    const {result} = renderHook(() => useCryptocurrencyFavorites());

    act(() => {
      result.current.setFavoriteItems(1);
    });

    expect(result.current.favorites).toEqual({1: 1});
    expect(setData).toHaveBeenCalledWith('cryptocurrencyFav', '1');
  });

  it('should remove favorite item correctly when item is already a favorite', async () => {
    getData.mockResolvedValue('1');

    const {result, waitForNextUpdate} = renderHook(() =>
      useCryptocurrencyFavorites(),
    );

    await waitForNextUpdate();

    act(() => {
      result.current.setFavoriteItems(1);
    });

    expect(result.current.favorites).toEqual({});
    expect(setData).toHaveBeenCalledWith('cryptocurrencyFav', '');
  });

  it('should initialize favorites from storage correctly', async () => {
    getData.mockResolvedValue('1');

    const {result, waitForNextUpdate} = renderHook(() =>
      useCryptocurrencyFavorites(),
    );

    await waitForNextUpdate();

    expect(result.current.favorites).toEqual({1: '1'});
  });

  it('should convert favorites to string correctly', async () => {
    getData.mockResolvedValue('1,2,3');

    const {result, waitForNextUpdate} = renderHook(() =>
      useCryptocurrencyFavorites(),
    );

    await waitForNextUpdate();

    const favoritesString = await result.current.favoritesToString();
    expect(favoritesString).toEqual('1,2,3');
  });

  it('should clear favorite items correctly', async () => {
    const {result} = renderHook(() => useCryptocurrencyFavorites());

    act(() => {
      result.current.clearFavoriteItems();
    });

    expect(result.current.favorites).toEqual({});
    expect(setData).toHaveBeenCalledWith('cryptocurrencyFav', '');
  });
});
