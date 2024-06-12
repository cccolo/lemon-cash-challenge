import {renderHook, act} from '@testing-library/react-hooks';
import {useAuth} from './useAuth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Mock de GoogleSignin
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    signIn: () => ({
      idToken: jest.fn,
    }),
    signOut: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve()),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    IN_PROGRESS: 'IN_PROGRESS',
    PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  },
  isErrorWithCode: jest.fn(() => true),
}));

describe('useAuth hook', () => {
  it('should signIn successfully', async () => {
    const {result} = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn();
    });

    expect(result.current.error).toBe('');
  });

  it('should handle signOut successfully', async () => {
    const {result} = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signOff();
    });

    expect(result.current.error).toBeUndefined();
  });

  it('should handle sign in error', async () => {
    const spy = jest.spyOn(GoogleSignin, 'signIn').mockImplementation(() => {
      throw new Error();
    });

    const {result} = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn();
    });

    spy.mockRestore();

    expect(result.current.error).toBeTruthy();
  });

  it('should handle sign out error', async () => {
    const spy = jest.spyOn(GoogleSignin, 'signOut').mockImplementation(() => {
      throw new Error();
    });

    const {result} = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signOff();
    });

    spy.mockRestore();

    expect(result.current.error).toBeTruthy();
  });
});
