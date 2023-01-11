// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg8KUJ6c40zmad1h7a6Q3y_7lF-D5AvsA",
  authDomain: "tg-challenge.firebaseapp.com",
  projectId: "tg-challenge",
  storageBucket: "tg-challenge.appspot.com",
  messagingSenderId: "970308193526",
  appId: "1:970308193526:web:54833be9b6aede83a130d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
