import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA-kENI7pVlA6gWo3xd_erNcl0EX2egR2g",
  authDomain: "appointment-managment-2405.firebaseapp.com",
  projectId: "appointment-managment-2405",
  storageBucket: "appointment-managment-2405.appspot.com",
  messagingSenderId: "184599988877",
  appId: "1:184599988877:web:68e465efdbb18f996530c4"
};

initializeApp(firebaseConfig)
export const auth = getAuth()
export const database = getFirestore()