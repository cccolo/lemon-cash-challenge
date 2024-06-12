import React from 'react';
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
  const [error, setError] = React.useState<string>();

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      return idToken || '';
    } catch (e) {
      if (isErrorWithCode(e)) {
        switch (e.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            setError('El incio de sesión fue cancelado');
            break;
          case statusCodes.IN_PROGRESS:
            setError('El proceso de inicio de sesión esta en progreso');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            setError(
              'Su dispositivo no cuenta con los servicios de google play',
            );
            break;
          default:
            setError(
              'Ouch! Ocurrio un problema, vuelva a intentarlo nuevamente',
            );
        }
      } else {
        setError('Ouch! Ocurrio un problema, vuelva a intentarlo nuevamente');
      }
    }
  };

  const googleSingOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (e) {
      setError('Ouch! Ocurrio un problema, vuelva a intentarlo nuevamente');
    }
  };

  const signIn = async () => {
    setError('');
    const token = await googleSignIn();
    if (!token) {
      return;
    }
    context?.signIn(token);
  };

  const signOff = async () => {
    googleSingOut();
    context?.signOff();
  };

  return {
    signIn,
    signOff,
    error,
  };
};
