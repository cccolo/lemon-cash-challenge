import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  CommonActions,
  RouteProp,
} from '@react-navigation/native';
import {Header} from '../../components';
import {useCryptocurrencyById} from '../../hooks';
import {formatDate} from '../../commons/formatDate';
import {ItemDetail} from './components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RefreshIcon} from '../../assets/images';
import {AppStackParamList} from '../../navigation/navigation';
import {DARK_GREY, WHITE} from '../../const/colors';

type CryptoDetailsRouteProp = RouteProp<
  AppStackParamList,
  'CryptoDetailScreen'
>;

export const CryptoDetailScreen: React.FC = () => {
  const route = useRoute<CryptoDetailsRouteProp>();
  const {params} = route;

  const navigation = useNavigation();

  const {cryptocurrencyByIdQuery} = useCryptocurrencyById(
    params?.id,
    true,
    true,
  );

  const data = React.useMemo(() => {
    if (!cryptocurrencyByIdQuery?.isFetching) {
      return cryptocurrencyByIdQuery?.data?.data[params.id];
    }
  }, [
    cryptocurrencyByIdQuery?.data?.data,
    cryptocurrencyByIdQuery?.isFetching,
    params.id,
  ]);

  const onBack = React.useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'CryptoListScreen'}],
      }),
    );
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detalles de Criptomoneda" onBack={onBack} />
      {cryptocurrencyByIdQuery?.isFetching && (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      {data && (
        <View style={styles.content}>
          <ItemDetail title="Nombre:" description={data.name || ''} />
          <ItemDetail title="Simbolo:" description={data.symbol || ''} />
          <ItemDetail
            title="Precio:"
            description={data?.quote?.USD?.price || 0}
          />
          <ItemDetail
            title="Cambio porcentual 24h:"
            description={data?.quote?.USD?.percent_change_24h || 0}
          />
          <ItemDetail
            title="Tapa del mercado:"
            description={data?.quote?.USD?.market_cap || 0}
          />
          <ItemDetail
            title="Ultima actualización:"
            description={
              formatDate(new Date(data?.quote?.USD?.last_updated)) || ''
            }
          />
          <View style={styles.refresh}>
            <TouchableOpacity onPress={cryptocurrencyByIdQuery.refetch}>
              <RefreshIcon />
            </TouchableOpacity>
            <Text style={styles.refreshText}>Refrescar</Text>
          </View>
        </View>
      )}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  refresh: {
    alignItems: 'center',
    marginTop: 30,
  },
  refreshText: {
    color: WHITE,
    marginTop: 6,
  },
});
