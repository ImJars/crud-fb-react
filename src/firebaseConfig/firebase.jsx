import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBndDGYzpW9mtrRPON2lpQDq7mPIE1SS8c",
  authDomain: "crud-fire-react-6ed55.firebaseapp.com",
  projectId: "crud-fire-react-6ed55",
  storageBucket: "crud-fire-react-6ed55.appspot.com",
  messagingSenderId: "1063963526093",
  appId: "1:1063963526093:web:bea7d48642ad8a12537a84"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);