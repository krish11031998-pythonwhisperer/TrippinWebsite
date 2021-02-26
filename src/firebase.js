import firebase from 'firebase/app'
import 'firebase/firestore'
var firebaseConfig = {
    apiKey: "AIzaSyDCIeAIQ_gZy8tYsHJ-NNRLeCHern_fjV8",
    authDomain: "trippin-89b8b.firebaseapp.com",
    databaseURL: "https://trippin-89b8b.firebaseio.com",
    projectId: "trippin-89b8b",
    storageBucket: "trippin-89b8b.appspot.com",
    messagingSenderId: "163017922978",
    appId: "1:163017922978:web:7560a3510b1b9788f6bafb",
    measurementId: "G-84DLJZC63M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
export default firebase
