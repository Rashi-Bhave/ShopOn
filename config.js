import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCkP9Zl0zvYOuebj4C9H7i0TMIS_J9wbFU",
    authDomain: "proud-coral-280616.firebaseapp.com",
    projectId: "proud-coral-280616",
    storageBucket: "proud-coral-280616.appspot.com",
    messagingSenderId: "220702452112",
    appId: "1:220702452112:web:febf15ea8862e2b210ab15"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase.firestore();