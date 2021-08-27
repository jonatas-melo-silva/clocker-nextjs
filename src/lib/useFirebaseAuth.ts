import { useState, useEffect } from 'react';
import FireBase from '../config/firebase';

type AuthUser = {
  uid: string;
  email: string;
};

const formatAuthUser = (user: AuthUser) => ({
  uid: user.uid,
  email: user.email,
});

const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState: AuthUser) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(authState as AuthUser);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInWithEmailAndPassword = (email: string , password: string) =>
    FireBase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email: string, password: string) =>
    FireBase.auth().createUserWithEmailAndPassword(email, password);

  const signOut = () => FireBase.auth().signOut().then(clear);

  useEffect(() => {
    const unsubscribe = FireBase.auth().onAuthStateChanged(
      authStateChanged as any
    );
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
};

export default useFirebaseAuth;
