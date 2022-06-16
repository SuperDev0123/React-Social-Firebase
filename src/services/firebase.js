import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
const config = {
  apiKey: "AIzaSyBxz13pCwfu8oPQ1tSJ-B9q9OhvyfnxDX4",
  authDomain: "warm-melody-349613.firebaseapp.com",
  databaseURL: "https://warm-melody-349613-default-rtdb.firebaseio.com/"
}

firebase.initializeApp(config)

export const auth = firebase.auth
export const db = firebase.database()
