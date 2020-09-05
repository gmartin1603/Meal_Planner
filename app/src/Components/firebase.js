import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAvJCB1T-yJKnA02lcQuSPnCDWne8dHFbc",
    authDomain: "meal-planner-7a232.firebaseapp.com",
    databaseURL: "https://meal-planner-7a232.firebaseio.com",
    projectId: "meal-planner-7a232",
    storageBucket: "meal-planner-7a232.appspot.com",
    messagingSenderId: "173736286395",
    appId: "1:173736286395:web:da165dae418fc5cef1b19e",
    measurementId: "G-3Q8NYX0L7Q"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig)


export default firebase;