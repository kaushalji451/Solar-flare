
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBr7xIPzf8ZXfvqn3VNIyhX5h9K7DpGxSA",
  authDomain: "urboncompany-25018.firebaseapp.com",
  projectId: "urboncompany-25018",
  storageBucket: "urboncompany-25018.firebasestorage.app",
  messagingSenderId: "1078808355531",
  appId: "1:1078808355531:web:6072b8ad565593d77c714e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

export { auth };