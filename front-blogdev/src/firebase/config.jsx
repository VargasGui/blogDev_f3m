
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp8TS7KIiy6TragjFYmqbh9yLhg0eHZBs",
  authDomain: "blogdev-gf.firebaseapp.com",
  projectId: "blogdev-gf",
  storageBucket: "blogdev-gf.appspot.com",
  messagingSenderId: "7262229903",
  appId: "1:7262229903:web:4c4b1d51eb7845dd2227fa",
  measurementId: "G-7F96XRFNHQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db}