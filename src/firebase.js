import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyC0KVO5g65xDwFQiK2NKMqPvfOGIQ_4Lvs",
    authDomain: "devehome-58782.firebaseapp.com",
    projectId: "devehome-58782",
    storageBucket: "devehome-58782.appspot.com",
    messagingSenderId: "119952678693",
    appId: "1:119952678693:web:a16c1426fbca06f22544cc",
    measurementId: "G-CQ2BRWX40Z",
  })
  .auth();
