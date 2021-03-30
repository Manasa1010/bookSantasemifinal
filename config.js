import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyCyU63WHW_Ojvtd7zGtD3mMxXPbv2r8jA4",
  authDomain: "book-santa-2-5d1c3.firebaseapp.com",
  projectId: "book-santa-2-5d1c3",
  storageBucket: "book-santa-2-5d1c3.appspot.com",
  messagingSenderId: "913141778373",
  appId: "1:913141778373:web:eec0466cb69da9d004edac"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();