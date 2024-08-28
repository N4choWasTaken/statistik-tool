import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase'; // Ensure the path is correct
import { useEffect, useState } from 'react';

export function useGetUserData(uid: string) {
  const [userData, setUserData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userDocRef = doc(db, 'Users', uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          return new Error('User not found');
        }
        const userData = { id: userDoc.id, ...userDoc.data() };
        setUserData(userData);
      } catch (err) {
        return new Error(err as string);
      }
    };

    fetchUsers();
  }, [uid]);

return userData;
}
