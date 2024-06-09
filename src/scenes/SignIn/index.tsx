import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {Logo} from '../../assets/images';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useAuth} from '../../hooks/useAuth';

export const SignInScreen: React.FC = () => {
  const {signIn} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Logo style={styles.logo} />
        <Text style={styles.description}>
          Conoce la cotización de Bitcoin, USDT, Ethereum y otras criptomonedas
          en tiempo real.
        </Text>
        <View style={styles.signIn}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// TODO
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(23, 23, 23)',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    margin: 16,
  },
  logo: {
    marginTop: 50,
  },
  description: {
    color: 'rgb(0, 240, 104)',
    fontFamily: 'NeueMachina-Regular',
    fontSize: 18,
    marginTop: 50,
    lineHeight: 21,
  },
  signIn: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 20,
  },
});
