import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const FirebaseConfig = {
  
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const FireBase = firebase.apps.length
? firebase.app()
: firebase.initializeApp(FirebaseConfig);

export const PersistenceMode = firebase.auth.Auth.Persistence.LOCAL;

// Initialize Firebase
export default FireBase;