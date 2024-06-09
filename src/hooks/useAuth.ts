import * as React from 'react';
import {
  statusCodes,
  isErrorWithCode,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {GOOGLE_SIGN_IN_WEB_CLIENT_ID} from '@env';
import {AuthContext} from '../context/AuthContext';

GoogleSignin.configure({
  webClientId: GOOGLE_SIGN_IN_WEB_CLIENT_ID,
  offlineAccess: true,
});

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      return idToken || '';
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const signIn = async () => {
    const token = await googleSignIn();
    if (!token) {
      return;
    }
    context?.signIn(token);
  };

  const signOff = () => {
    context?.signOff();
  };

  return {
    signIn,
    signOff,
  };
};
