import * as React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  useCryptocurrency,
  useCryptocurrencyFavorites,
  useCryptocurrencySearch,
  useCryptocurrencyById,
} from '../../hooks';
import {Cryptocurrency, CryptocurrencyData} from '../../intefaces';
import {OptionsMenu, DataList} from './components';
import {Alert, Header} from '../../components';

const CryptoListScreen: React.FC = () => {
  const [showError, setShowError] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [enableFav, setEnableFav] = React.useState<boolean>(false);
  const [favoritesId, setFavoritesId] = React.useState<string>('');

  // TODO: tipar navigation
  const navigation = useNavigation<any>();
  const {favoritesToString} = useCryptocurrencyFavorites();
  const {cryptocurrencyInfiniteQuery} = useCryptocurrency();
  const {cryptocurrencyQueries} = useCryptocurrencySearch(searchValue);
  const {cryptocurrencyByIdQuery} = useCryptocurrencyById(
    favoritesId,
    enableFav,
  );

  const extractData = (query?: Cryptocurrency) =>
    query?.data ? Object.values(query.data).flat() : [];

  const [cryptocurrencyBySymbolQuery, cryptocurrencyBySlugQuery] =
    cryptocurrencyQueries;

  React.useEffect(() => {
    setShowError(
      cryptocurrencyInfiniteQuery.isError ||
        (cryptocurrencyBySymbolQuery.isError &&
          cryptocurrencyBySlugQuery.isError),
    );
  }, [
    cryptocurrencyInfiniteQuery.isError,
    cryptocurrencyBySymbolQuery.isError,
    cryptocurrencyBySlugQuery.isError,
  ]);

  const flattenedCryptocurrencyDataFromSearch = React.useMemo(() => {
    const bySymbol = extractData(cryptocurrencyBySymbolQuery.data);
    const bySlug = extractData(cryptocurrencyBySlugQuery.data);
    const combinedData = [...bySymbol, ...bySlug];
    const uniqueData = combinedData.filter(
      (item, index, self) => index === self.findIndex(({id}) => id === item.id),
    );
    return uniqueData;
  }, [cryptocurrencyBySlugQuery.data, cryptocurrencyBySymbolQuery.data]);

  const flattenedCryptocurrencyFavData = React.useMemo(() => {
    return extractData(cryptocurrencyByIdQuery.data);
  }, [cryptocurrencyByIdQuery.data]);

  const flattenedCryptocurrencyInifity: CryptocurrencyData[] = React.useMemo(
    () =>
      cryptocurrencyInfiniteQuery.data?.pages.flatMap(
        (page: Cryptocurrency) => page.data,
      ) || [],
    [cryptocurrencyInfiniteQuery.data],
  );

  const closeModal = React.useCallback(() => {
    setShowError(false);
  }, []);

  // TODO:
  const onAction = async (
    type: 'SEARCH' | 'FAVORITES',
    value: string | boolean,
  ) => {
    switch (type) {
      case 'SEARCH':
        setSearchValue(value as string);
        break;
      case 'FAVORITES':
        setEnableFav(value as boolean);
        setFavoritesId(await favoritesToString());
        break;
      default:
        break;
    }
  };

  const goToCryptoDetail = (id: number) => {
    navigation.navigate('CryptoDetailScreen', {id});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Listado de Criptomonedas" hideBack />
      <View style={styles.content}>
        <OptionsMenu
          onAction={onAction}
          onToggleMenu={() => setSearchValue('')}
        />
        {enableFav && (
          <DataList
            onSelectItem={goToCryptoDetail}
            data={flattenedCryptocurrencyFavData}
            hasPagination={false}
            isLoading={cryptocurrencyByIdQuery.isFetching}
          />
        )}
        {!enableFav && searchValue && (
          <DataList
            onSelectItem={goToCryptoDetail}
            data={flattenedCryptocurrencyDataFromSearch}
            isLoading={
              cryptocurrencyBySlugQuery.isFetching ||
              cryptocurrencyBySymbolQuery.isFetching
            }
          />
        )}
        {!enableFav && !searchValue && (
          <DataList
            onSelectItem={goToCryptoDetail}
            data={flattenedCryptocurrencyInifity}
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
    </SafeAreaView>
  );
};

// TODO:
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(23, 23, 23)',
    flex: 1,
  },
  content: {
    margin: 16,
  },
});

export default React.memo(CryptoListScreen);
