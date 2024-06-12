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
import {REGULAR, ULTRA_BOLD} from '../../../const/fonts';
import {GREEN, WHITE, WHITE_400} from '../../../const/colors';

type Props = {
  data: CryptocurrencyData[];
  fetchNextPage?: () => void;
  hasPagination?: boolean;
  isLoading: boolean;
  onSelectItem: (id: number) => void;
};

export const DataList: React.FC<Props> = ({
  isLoading,
  fetchNextPage,
  hasPagination,
  data,
  onSelectItem,
}: Props) => {
  const {setFavoriteItems, favorites} = useCryptocurrencyFavorites();

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
        <View style={styles.loader} testID="activity-indicator">
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  }, [isLoading]);

  const renderItem = React.useCallback(
    (item: CryptocurrencyData) => {
      return (
        <TouchableOpacity
          onPress={() => onSelectItem(item.id)}
          testID={`item-${item.id}`}>
          <View style={styles.container}>
            <View>
              <Text style={[styles.description, styles.symbol]}>
                {item.symbol}
              </Text>
              <View>
                <Text style={[styles.description, styles.name]}>
                  {item.name}
                </Text>
              </View>
            </View>
            <View style={styles.price}>
              <Text style={styles.description}>{item.quote.USD.price}</Text>
            </View>
            <View style={styles.favorites}>
              <TouchableOpacity
                onPress={() => setFavoriteItems(item.id)}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                testID={`favorite-button-${item.id}`}>
                {favorites[item.id] ? <StartSelectIcon /> : <StartIcon />}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [favorites, onSelectItem, setFavoriteItems],
  );

  const listEmptyComponent = React.useCallback(() => {
    return (
      !isLoading && (
        <View style={styles.container}>
          <Text style={styles.description}>
            No hay información para mostrar.
          </Text>
        </View>
      )
    );
  }, [isLoading]);

  return (
    <FlatList
      data={data}
      onEndReached={fetchNext}
      onEndReachedThreshold={0.8}
      ListFooterComponent={ListEndLoader}
      renderItem={({item}) => renderItem(item)}
      keyExtractor={cryptocurrencyItemExtractorKey}
      ListEmptyComponent={listEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: WHITE_400,
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
    padding: 8,
  },
  symbol: {
    fontFamily: ULTRA_BOLD,
    textAlign: 'left',
    fontSize: 14,
  },
  name: {
    color: WHITE,
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
    color: GREEN,
    fontFamily: REGULAR,
    textAlign: 'right',
    lineHeight: 16,
    fontSize: 12,
  },
  favorites: {
    justifyContent: 'center',
  },
});
