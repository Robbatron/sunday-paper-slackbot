import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAGoW6bQZPIHhl3F1BJ193L18zCJIB3YL4",
  authDomain: "sundaypaper-935e0.firebaseapp.com",
  databaseURL: "https://sundaypaper-935e0.firebaseio.com",
  projectId: "sundaypaper-935e0",
  storageBucket: "sundaypaper-935e0.appspot.com",
  messagingSenderId: "365673062936"
}
firebase.initializeApp(config)

export default firebase