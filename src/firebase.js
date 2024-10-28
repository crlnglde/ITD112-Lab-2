import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDi640iXYyIQlTJ88M0gFmPodKxCIt-HV4",
    authDomain: "elevera-lab2.firebaseapp.com",
    projectId: "elevera-lab2",
    storageBucket: "elevera-lab2.appspot.com",
    messagingSenderId: "115979055382",
    appId: "1:115979055382:web:dc8e1fbb898a9c8e5b2037",
    measurementId: "G-BBB2BQYG0M"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Initialize Firestore
const db = getFirestore(app);

export { db };