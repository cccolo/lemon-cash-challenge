import {createContext} from 'react';

interface AuthContextType {
  signIn: (token: string) => void;
  signOff: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
