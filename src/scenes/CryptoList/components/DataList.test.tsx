import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {DataList} from './DataList';
import {CryptocurrencyData} from '../../../intefaces';
import {useCryptocurrencyFavorites} from '../../../hooks';

// Mocking the custom hook
jest.mock('../../../hooks', () => ({
  useCryptocurrencyFavorites: jest.fn(),
}));

// Mocking the StartIcon and StartSelectIcon components
jest.mock('../../../assets/images', () => ({
  StartIcon: () => <></>,
  StartSelectIcon: () => <></>,
}));

const mockUseCryptocurrencyFavorites =
  useCryptocurrencyFavorites as jest.MockedFunction<
    typeof useCryptocurrencyFavorites
  >;

describe('DataList Component', () => {
  const data: CryptocurrencyData[] = [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      slug: 'bitcoin',
      num_market_pairs: 10,
      date_added: new Date('2024-06-12T14:58:53.329Z'),
      tags: ['tag1', 'tag2'],
      max_supply: 21000000,
      circulating_supply: 19000000,
      total_supply: 20000000,
      infinite_supply: false,
      platform: null,
      cmc_rank: 1,
      self_reported_circulating_supply: null,
      self_reported_market_cap: null,
      tvl_ratio: null,
      last_updated: new Date('2024-06-12T14:58:53.329Z'),
      quote: {
        USD: {
          price: 30000,
          volume_24h: 1000000,
          volume_change_24h: 5,
          percent_change_1h: 0.1,
          percent_change_24h: 1,
          percent_change_7d: 7,
          percent_change_30d: 30,
          percent_change_60d: 60,
          percent_change_90d: 90,
          market_cap: 600000000,
          market_cap_dominance: 40,
          fully_diluted_market_cap: 630000000,
          tvl: null,
          last_updated: new Date('2024-06-12T14:58:53.329Z'),
        },
      },
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      slug: 'ethereum',
      num_market_pairs: 20,
      date_added: new Date('2024-06-12T14:58:53.329Z'),
      tags: ['tag3', 'tag4'],
      max_supply: null,
      circulating_supply: 110000000,
      total_supply: 120000000,
      infinite_supply: true,
      platform: null,
      cmc_rank: 2,
      self_reported_circulating_supply: null,
      self_reported_market_cap: null,
      tvl_ratio: null,
      last_updated: new Date('2024-06-12T14:58:53.329Z'),
      quote: {
        USD: {
          price: 2000,
          volume_24h: 500000,
          volume_change_24h: 3,
          percent_change_1h: 0.05,
          percent_change_24h: 0.5,
          percent_change_7d: 5,
          percent_change_30d: 20,
          percent_change_60d: 50,
          percent_change_90d: 80,
          market_cap: 220000000,
          market_cap_dominance: 20,
          fully_diluted_market_cap: 230000000,
          tvl: null,
          last_updated: new Date('2024-06-12T14:58:53.329Z'),
        },
      },
    },
  ];

  const setFavoriteItemsMock = jest.fn();
  const onSelectItemMock = jest.fn();
  const fetchNextPageMock = jest.fn();

  beforeEach(() => {
    mockUseCryptocurrencyFavorites.mockReturnValue({
      favorites: {1: 1},
      setFavoriteItems: setFavoriteItemsMock,
      favoritesToString: jest.fn(),
      clearFavoriteItems: jest.fn(),
    });
  });

  it('renders correctly and matches snapshot', () => {
    const {toJSON} = render(
      <DataList
        data={data}
        isLoading={false}
        fetchNextPage={fetchNextPageMock}
        hasPagination={true}
        onSelectItem={onSelectItemMock}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders loading indicator when isLoading is true', () => {
    const {getByTestId} = render(
      <DataList
        data={[]}
        isLoading={true}
        fetchNextPage={fetchNextPageMock}
        hasPagination={true}
        onSelectItem={onSelectItemMock}
      />,
    );

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('calls onSelectItem when an item is pressed', () => {
    const {getByTestId} = render(
      <DataList
        data={data}
        isLoading={false}
        fetchNextPage={fetchNextPageMock}
        hasPagination={true}
        onSelectItem={onSelectItemMock}
      />,
    );

    fireEvent.press(getByTestId('item-1'));
    expect(onSelectItemMock).toHaveBeenCalledWith(1);
  });

  it('calls setFavoriteItems when favorite icon is pressed', () => {
    const {getByTestId} = render(
      <DataList
        data={data}
        isLoading={false}
        fetchNextPage={fetchNextPageMock}
        hasPagination={true}
        onSelectItem={onSelectItemMock}
      />,
    );

    fireEvent.press(getByTestId('favorite-button-1'));
    expect(setFavoriteItemsMock).toHaveBeenCalledWith(1);
  });
});
