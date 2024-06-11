import * as React from 'react';
import {View, Text} from 'react-native';

export const CryptoDetailsScreen: React.FC<any> = () => {
  return (
    <View>
      <Text>CryptoDetailsScreen</Text>
      {/* https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=USDT */}
    </View>
  );
};

// const {signOff} = useAuth();
{
  /* <View>
         <TouchableOpacity
          onPress={signOff}
          style={{backgroundColor: 'blue', padding: 10, borderRadius: 5}}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Cerrar sesion
          </Text>
        </TouchableOpacity> 
       <TouchableOpacity
          onPress={() => {
            fetchNextPage();
          }}
          style={{backgroundColor: 'blue', padding: 10, borderRadius: 5}}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Cargar mas...
          </Text>
        </TouchableOpacity> 
      </View> */
}
