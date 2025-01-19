import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "abcd1234",
  authDomain: "devs2chat.firebaseapp.com",
  databaseURL: "https://devs2chat.firebaseio.com",
  projectId: "devs2chat",
  storageBucket: "devs2chat.appspot.com",
  messagingSenderId: "abcd1234",
  appId: "1:abcd1234:web:abcd1234",
  measurementId: "G-QQX414GRS7",
};

// initialize app

const firebaseApp = firebase.initializeApp(firebaseConfig);

// this would access our firestore instance

const db = firebaseApp.firestore();

// authentication handler
const auth = firebase.auth();

// google for authentication provider
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
