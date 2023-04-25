// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA4U-hpYlR1qyPkgApQzqzAsCw9VBFT0u8",
  authDomain: "outspoken-1fd92.firebaseapp.com",
  projectId: "outspoken-1fd92",
  storageBucket: "outspoken-1fd92.appspot.com",
  messagingSenderId: "281275462195",
  appId: "1:281275462195:web:dd97433b692de084b62946",
  measurementId: "G-XTYPF738X0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);