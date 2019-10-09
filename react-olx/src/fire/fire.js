import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBjQiwp8PtsEd2z7Gzt3ngKBrI4eDjKXLo",
  authDomain: "reactolx.firebaseapp.com",
  databaseURL: "https://reactolx.firebaseio.com",
  projectId: "reactolx",
  storageBucket: "reactolx.appspot.com",
  messagingSenderId: "578460986683",
  appId: "1:578460986683:web:0f90569fce7c3c6a"
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;