import * as React from 'react';
import {View, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import {NavigationContainerRef, useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {
  useCryptocurrency,
  useCryptocurrencyFavorites,
  useCryptocurrencySearch,
  useCryptocurrencyById,
} from '../../hooks';
import {OptionsMenu, DataList} from './components';
import {Alert, Header} from '../../components';
import {AppStackParamList} from '../../navigation/navigation';
import {DARK_GREY} from '../../const/colors';

type AppNavigation = NavigationContainerRef<AppStackParamList>;

const HEIGHT_OFFSET = 150;

const CryptoListScreen: React.FC = () => {
  const [showError, setShowError] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [enableFav, setEnableFav] = React.useState<boolean>(false);
  const [favoritesId, setFavoritesId] = React.useState<string>('');

  const navigation = useNavigation<AppNavigation>();
  const {favoritesToString} = useCryptocurrencyFavorites();

  const {cryptocurrencyInfiniteQuery} = useCryptocurrency();
  const {cryptocurrencySearch} = useCryptocurrencySearch(searchValue);
  const {cryptocurrencyByIdQuery} = useCryptocurrencyById(
    favoritesId,
    enableFav,
  );

  const setOnChangeTextDebounced = React.useRef(
    _.debounce((text: string) => setSearchValue(text), 500),
  );

  const closeModal = React.useCallback(() => {
    setShowError(false);
  }, []);

  const onAction = React.useCallback(
    async (type: 'SEARCH' | 'FAVORITES', value: string | boolean) => {
      switch (type) {
        case 'SEARCH':
          setOnChangeTextDebounced.current(value as string);
          break;
        case 'FAVORITES':
          setEnableFav(value as boolean);
          setFavoritesId(await favoritesToString());
          break;
        default:
          throw new Error(`Unsupported action type: ${type}`);
      }
    },
    [favoritesToString],
  );

  const goToCryptoDetail = (id: number) => {
    navigation.navigate('CryptoDetailScreen', {id});
  };

  React.useEffect(() => {
    setShowError(
      cryptocurrencyInfiniteQuery.isError ||
        cryptocurrencySearch.isError ||
        cryptocurrencyByIdQuery.isError,
    );
  }, [
    cryptocurrencyByIdQuery.isError,
    cryptocurrencyInfiniteQuery.isError,
    cryptocurrencySearch.isError,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Listado de Criptomonedas" hideBack />
      <View style={styles.content}>
        <OptionsMenu
          onAction={onAction}
          onToggleMenu={() => setSearchValue('')}
        />
        <View style={styles.dataListContainer}>
          {enableFav && (
            <DataList
              onSelectItem={goToCryptoDetail}
              data={cryptocurrencyByIdQuery.data || []}
              hasPagination={false}
              isLoading={cryptocurrencyByIdQuery.isFetching}
            />
          )}
          {!enableFav && searchValue && (
            <DataList
              onSelectItem={goToCryptoDetail}
              data={cryptocurrencySearch.data}
              isLoading={cryptocurrencySearch.isFetching}
            />
          )}
          {!enableFav && !searchValue && (
            <DataList
              onSelectItem={goToCryptoDetail}
              data={cryptocurrencyInfiniteQuery.data}
              hasPagination={cryptocurrencyInfiniteQuery.hasNextPage}
              fetchNextPage={cryptocurrencyInfiniteQuery.fetchNextPage}
              isLoading={
                cryptocurrencyInfiniteQuery.isFetchingNextPage ||
                cryptocurrencyInfiniteQuery.isFetching
              }
            />
          )}
          {showError && (
            <Alert
              message="Ouch! Ocurrio un problema, vuelva a intentarlo nuevamente"
              modalVisible={showError}
              onClose={closeModal}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_GREY,
    flex: 1,
  },
  content: {
    margin: 16,
  },
  dataListContainer: {
    marginBottom: 150,
    height: Dimensions.get('window').height - HEIGHT_OFFSET,
  },
});

export default React.memo(CryptoListScreen);
