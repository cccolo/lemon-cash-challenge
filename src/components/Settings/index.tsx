import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useAuth, useCryptocurrencyFavorites} from '../../hooks';
import {DARK_GREY, WHITE} from '../../const/colors';

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_GREY,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 40,
  },
  closeSession: {
    color: WHITE,
  },
});
