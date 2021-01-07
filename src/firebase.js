import * as firebase from 'firebase/app';
import 'firebase/database'

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAD9zX25sKemCaNjktzHG36bGzq7LYdgKI",
    authDomain: "spotify-f2ba3.firebaseapp.com",
    databaseURL: "https://spotify-f2ba3.firebaseio.com",
    projectId: "spotify-f2ba3",
    storageBucket: "spotify-f2ba3.appspot.com",
    messagingSenderId: "497182515389",
    appId: "1:497182515389:web:182b0ecbdb742dbd5f17d4"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

    // initialize fb database
let database = firebase.database();





