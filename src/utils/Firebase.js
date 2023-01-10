import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBBOA3DTgJi8qYgODDaAByLAa0WVMtA2lw',
  authDomain: 'reactath.firebaseapp.com',
  projectId: 'reactath',
  storageBucket: 'reactath.appspot.com',
  messagingSenderId: '866299345046',
  appId: '1:866299345046:web:e07ae911c8646d6d416ab7',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(app);