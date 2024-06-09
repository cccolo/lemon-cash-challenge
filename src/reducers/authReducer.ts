export const ActionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
} as const;

type Action =
  | {type: typeof ActionTypes.SIGN_IN; token: string}
  | {type: typeof ActionTypes.SIGN_OUT};

interface State {
  isSignout: boolean;
  userToken?: string;
}

export const initialState: State = {
  isSignout: true,
  userToken: undefined,
};

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case ActionTypes.SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userToken: undefined,
      };
    default:
      return state;
  }
};
