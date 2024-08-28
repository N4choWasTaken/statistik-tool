import { auth } from "../firebase"; // Ensure this import matches the updated firebase.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { setUserRole } from "../services/upload/registerUser";

// Create a new user with email and password
export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setUserRole(user.uid, "unverified", email, email);
    
    return userCredential;
  } catch (error) {
    console.error("Error creating user:", error);
    return error;
  }
}

// Sign in an existing user with email and password
export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error; // Re-throw the error to be handled by the calling function
  }
}

// Sign out the current user
export const doSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error; // Re-throw the error to be handled by the calling function
  }
}

export const sendResetPasswordEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    // Provide feedback to the user
  } catch (error) {
    console.error("Error sending password reset email:", error);
    // Provide feedback to the user
  }
};