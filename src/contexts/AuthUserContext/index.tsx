import React, { createContext, useContext } from 'react';
import useFirebaseAuth from '../../lib/useFirebaseAuth';

type AuthUser = {
  uid: string;
  email: string;
};

type AuthUserContextData = {
  authUser: AuthUser | null;
  loading: boolean;
  signInWithEmailAndPassword: (email: string, password: string) => void;
  createUserWithEmailAndPassword: (email: string, password: string) => void;
  signOut: () => void;
};

const AuthUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {}
} as AuthUserContextData);

const AuthUserProvider: React.FC = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export default AuthUserProvider;

export const useAuth = () => {
  const auth = useContext(AuthUserContext);
  return auth;
};
