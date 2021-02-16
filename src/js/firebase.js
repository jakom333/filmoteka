import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCfvslvxbFdpg8Db_S6cZYbUPnTVC-IP3M",
  authDomain: "filmoteka-bl.firebaseapp.com",
  projectId: "filmoteka-bl",
  storageBucket: "filmoteka-bl.appspot.com",
  messagingSenderId: "956751452003",
  appId: "1:956751452003:web:025a52259c8028e3e4e556",
  measurementId: "G-K1CCJQZXYV",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
async function userRegistration(email, password) {
  try {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(data.user.uid);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
console.log(
  firebase
    .auth()
    .createUserWithEmailAndPassword(
      prompt("Enter email"),
      prompt("Enter password"),
    ), //new user
);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.email);
  } else {
    this.$router.push("/login");
  }
});
