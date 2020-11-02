import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA1hiq5j4WkAAVsXu7W6EP1Jm2PQ0B3H8",
  authDomain: "devs2chat.firebaseapp.com",
  databaseURL: "https://devs2chat.firebaseio.com",
  projectId: "devs2chat",
  storageBucket: "devs2chat.appspot.com",
  messagingSenderId: "862913165344",
  appId: "1:862913165344:web:f242b925314fafa1956445",
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
