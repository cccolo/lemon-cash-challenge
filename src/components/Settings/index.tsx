import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useAuth, useCryptocurrencyFavorites} from '../../hooks';

export const Settings: React.FC = () => {
  const {signOff} = useAuth();
  const {clearFavoriteItems} = useCryptocurrencyFavorites();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          signOff();
          clearFavoriteItems();
          navigation.dispatch(DrawerActions.closeDrawer());
        }}>
        <Text style={styles.closeSession}>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
};

// TODO:
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(23, 23, 23)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 40,
  },
  closeSession: {
    color: 'red',
  },
});
