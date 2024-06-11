import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CryptocurrencyData} from '../../../intefaces';
import {StartIcon, StartSelectIcon} from '../../../assets/images';
import {useCryptocurrencyFavorites} from '../../../hooks';

type Props = {
  data: CryptocurrencyData[];
  fetchNextPage?: () => void;
  hasPagination?: boolean;
  isLoading: boolean;
};

export const DataList: React.FC<Props> = ({
  isLoading,
  fetchNextPage,
  hasPagination,
  data,
}: Props) => {
  const {setFavoritesItems, favorites} = useCryptocurrencyFavorites();

  const cryptocurrencyItemExtractorKey = React.useCallback(
    (item: CryptocurrencyData) => {
      return item.id.toString();
    },
    [],
  );

  const fetchNext = React.useCallback(() => {
    if (!hasPagination) {
      return;
    }
    fetchNextPage?.();
  }, [hasPagination, fetchNextPage]);

  const ListEndLoader = React.useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  }, [isLoading]);

  const renderItem = React.useCallback(
    (item: CryptocurrencyData) => {
      return (
        <View style={styles.container}>
          <View>
            <Text style={[styles.description, styles.symbol]}>
              {item.symbol}
            </Text>
            <View>
              <Text style={[styles.description, styles.name]}>{item.name}</Text>
            </View>
          </View>
          <View style={styles.price}>
            <Text style={styles.description}>{item.quote.USD.price}</Text>
          </View>
          <View style={styles.favorites}>
            <TouchableOpacity onPress={() => setFavoritesItems(item.id)}>
              {favorites[item.id] ? <StartSelectIcon /> : <StartIcon />}
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [favorites, setFavoritesItems],
  );

  return (
    <FlatList
      data={data}
      onEndReached={fetchNext}
      onEndReachedThreshold={0.8}
      ListFooterComponent={ListEndLoader}
      renderItem={({item}) => renderItem(item)}
      keyExtractor={cryptocurrencyItemExtractorKey}
    />
  );
};

// TODO:
const styles = StyleSheet.create({
  container: {
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
    padding: 8,
  },
  symbol: {
    fontFamily: 'NeueMachina-Ultrabold',
    textAlign: 'left',
    fontSize: 14,
  },
  name: {
    color: 'white',
    fontSize: 12,
    textAlign: 'left',
  },
  price: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  loader: {
    margin: 10,
  },
  description: {
    color: 'rgb(0, 240, 104)',
    fontFamily: 'NeueMachina-Regular',
    textAlign: 'right',
    lineHeight: 16,
    fontSize: 12,
  },
  favorites: {
    justifyContent: 'center',
  },
});
