import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from '../firebase'

export interface User {
    active: boolean;
    id: string;
    Name: string;
    Number: number;
}

const usePlayers = () => {
    const [players, setPlayers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'Players'));
            const playerList: User[] = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })) as User[];
            setPlayers(playerList);
            setLoading(false);
          } catch (err) {
            setError(err as Error);
            setLoading(false);
          }
        };
    
        fetchUsers();
      }, []);

  return { players, loading, error };
};

export default usePlayers;