import React, {useMemo, useReducer} from 'react';
import AppNavigator from './navigation/AppNavigator';
import {AuthContext} from './context/AuthContext';
import {authReducer, initialState, ActionTypes} from './reducers/authReducer';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const authContext = useMemo(
    () => ({
      signIn: (token: string) => dispatch({type: ActionTypes.SIGN_IN, token}),
      signOff: () => dispatch({type: ActionTypes.SIGN_OUT}),
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator isSignout={state.isSignout} />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
