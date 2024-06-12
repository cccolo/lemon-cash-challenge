import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SignInScreen} from '../scenes/SignIn';
import CryptoListScreen from '../scenes/CryptoList';
import {CryptoDetailScreen} from '../scenes/CryptoDetails';
import {Settings} from '../components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  drawerStyle: {
    width: 200,
  },
  swipeEdgeWidth: 0,
};

const AppStack = ({isSignout}: {isSignout: boolean}) => {
  return (
    <Stack.Navigator
      initialRouteName="SignInScreen"
      screenOptions={screenOptions}>
      {isSignout ? (
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
      ) : (
        <>
          <Stack.Screen name="CryptoListScreen" component={CryptoListScreen} />
          <Stack.Screen
            name="CryptoDetailScreen"
            component={CryptoDetailScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const AppNavigator = ({isSignout}: {isSignout: boolean}) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{...screenOptions, drawerPosition: 'right'}}
        drawerContent={Settings}
        detachInactiveScreens>
        <Drawer.Screen name="App">
          {() => <AppStack isSignout={isSignout} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
