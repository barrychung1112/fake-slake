import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCKiBAsUSKd6hxBfkXbuGObMUsjeyZ7Wy4",
  authDomain: "fake-slake.firebaseapp.com",
  projectId: "fake-slake",
  storageBucket: "fake-slake.appspot.com",
  messagingSenderId: "559900422694",
  appId: "1:559900422694:web:e594990916ce41c33c2ce7",
  measurementId: "G-EE1HLRT49M",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
