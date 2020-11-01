
import firebase from "firebase"; 


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCRvAsdCsNhmYOlrS7MfgidqSKq-EJsm9k",
    authDomain: "devmeetchat.firebaseapp.com",
    databaseURL: "https://devmeetchat.firebaseio.com",
    projectId: "devmeetchat",
    storageBucket: "devmeetchat.appspot.com",
    messagingSenderId: "258218487049",
    appId: "1:258218487049:web:d5ff3d71ee5b3c0192b7d8",
    measurementId: "G-QXBGNH4RN1"
  };

  // initialize app 

  const firebaseApp = firebase.initializeApp
  (firebaseConfig); 

  // this would access our firestore instance 

  const db = firebaseApp.firestore() ;

  // authentication handler
  const auth = firebase.auth() ; 

  // google for authentication provider 
  const provider = new firebase.auth.GoogleAuthProvider() ; 


  export {auth , provider};
  export default db; 