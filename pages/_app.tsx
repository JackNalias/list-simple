import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import LayoutPrimary from '../layouts/LayoutPrimary'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC9EP7mMBgcGQEcwLJbvF2KyCUlfnPttV4",
  authDomain: "list-simple.firebaseapp.com",
  projectId: "list-simple",
  storageBucket: "list-simple.appspot.com",
  messagingSenderId: "838552056936",
  appId: "1:838552056936:web:b1fbf747b56dd9a714f7dd",
  measurementId: "G-E535N0HSQJ"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutPrimary>
      <Component {...pageProps} />
    </LayoutPrimary>
  )
}

export default MyApp
