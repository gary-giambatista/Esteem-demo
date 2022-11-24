// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDZANOVUg4JQjwjmZL4E7Z2OrjF76jKmcA",
	authDomain: "esteem-demo.firebaseapp.com",
	projectId: "esteem-demo",
	storageBucket: "esteem-demo.appspot.com",
	messagingSenderId: "17324153528",
	appId: "1:17324153528:web:4b61e88102d5a70464b24d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

export { auth, db, app };
