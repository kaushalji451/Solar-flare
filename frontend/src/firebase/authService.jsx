import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// login user
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    console.error("Login Error:", error.message);
  }
};

// signup user
const signupUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Signup Error:", error.message);
  }
};

//   google signup
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In User:", result.user);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
  }
};

// logout
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};

export { signInWithGoogle, signupUser, loginUser, logoutUser };
