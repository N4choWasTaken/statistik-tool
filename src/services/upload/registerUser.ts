import { getFirestore, doc, setDoc } from 'firebase/firestore';
// Initialize Firestore
const db = getFirestore();

export const setUserRole = async (
  userUid: string,
  role: string,
  email: string,
  displayName: string,
  playerRef: string
) => {
  try {
    await setDoc(doc(db, 'Users', userUid), {
      role,
      email,
      displayName,
      playerRef,
    });
  } catch (error) {
    console.error('Error setting user role:', error);
  }
};
