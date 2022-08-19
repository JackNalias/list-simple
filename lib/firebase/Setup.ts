import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFzYWD7CtPiYxttVCaRh_mgJODX3gPV5Y",
  authDomain: "listsimple-2bafa.firebaseapp.com",
  projectId: "listsimple-2bafa",
  storageBucket: "listsimple-2bafa.appspot.com",
  messagingSenderId: "901029177949",
  appId: "1:901029177949:web:42e272b7908d0e9b587bb4",
  measurementId: "G-3ELRTWXHEF"
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()