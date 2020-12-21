import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyC_8us7vH5gFCuptNaxZljvbfWZMXsy7pk",
    authDomain: "booksanta-844b5.firebaseapp.com",
    projectId: "booksanta-844b5",
    storageBucket: "booksanta-844b5.appspot.com",
    messagingSenderId: "42871149671",
    appId: "1:42871149671:web:32b939bd64bf65a0d7f0c2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();