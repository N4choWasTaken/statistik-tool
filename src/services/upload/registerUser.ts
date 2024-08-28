import { getFirestore, doc, setDoc } from "firebase/firestore";
// Initialize Firestore
const db = getFirestore();

export const setUserRole = async (userUid: string, role: string, email: string, displayName: string) => {
  try {
    await setDoc(doc(db, "Users", userUid), {
      role, email, displayName
    });
    console.log("User role set successfully.");
  } catch (error) {
    console.error("Error setting user role:", error);
  }
};
