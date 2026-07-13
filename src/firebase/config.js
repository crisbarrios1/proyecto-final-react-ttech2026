// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7sJ-IQ25JMSjrRhaXKK7CrHIZ3gEqJf4",
  authDomain: "pro-final-ttech-react-2026.firebaseapp.com",
  projectId: "pro-final-ttech-react-2026",
  storageBucket: "pro-final-ttech-react-2026.firebasestorage.app",
  messagingSenderId: "115352025280",
  appId: "1:115352025280:web:74ace1291e9b3d561a9525"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

//para cuando veamos el login
const auth = getAuth(app);

export { db, auth };