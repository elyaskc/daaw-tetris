import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAqP88f1sxdBMLKeujWVZGNOZaEhl1vtzs",
  authDomain: "daaw-tetris.firebaseapp.com",
  projectId: "daaw-tetris",
  storageBucket: "daaw-tetris.firebasestorage.app",
  messagingSenderId: "602454793912",
  appId: "1:602454793912:web:fd481f322d5ca14d1c1e4d",
  measurementId: "G-VPQH884G9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app, "https://daaw-tetris-default-rtdb.firebaseio.com/");