import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from '../scenes/SignIn';
import {CryptoListScreen} from '../scenes/CryptoList';
import {CryptoDetailsScreen} from '../scenes/CryptoDetails';

const Stack = createNativeStackNavigator();

const AppNavigator = ({isSignout}: {isSignout: boolean}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isSignout ? (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        ) : (
          <>
            <Stack.Screen name="CryptoList" component={CryptoListScreen} />
            <Stack.Screen name="CryptoDetail" component={CryptoDetailsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
