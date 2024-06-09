import * as React from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

export const CryptoListScreen: React.FC<any> = () => {
  const {signOff} = useAuth();

  return (
    <View>
      <Text>CryptoListScreen</Text>
      <TouchableOpacity
        onPress={signOff}
        style={{backgroundColor: 'blue', padding: 10, borderRadius: 5}}>
        <Text style={{color: 'white', textAlign: 'center'}}>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
};
