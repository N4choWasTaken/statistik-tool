import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { Timestamp } from "firebase/firestore";
import { DocumentReference } from "firebase/firestore";


export interface Game {
  id: string;
  Date: Timestamp;
  Hometeam: string;
  Guestteam: string;
}

export interface Player {
    id: string;
    Attack: number;
    Player: string | DocumentReference;
  }

export const useGame = (gameId: string) => {
  const [gameData, setGameData] = useState<Game | null>(null);
  const [playersData, setPlayersData] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGameAndPlayers = async () => {
      try {
        setLoading(true);

        // Reference to the game document
        const gameDocRef = doc(db, 'Games', gameId);

        // Fetch the game document data
        const gameDocSnap = await getDoc(gameDocRef);
        if (!gameDocSnap.exists()) {
          throw new Error('Game not found');
        }
        const gameData = { id: gameDocSnap.id, ...gameDocSnap.data() } as Game;
        setGameData(gameData);

        // Reference to the "Players" subcollection within that game document
        const playersCollectionRef = collection(gameDocRef, 'Players');

        // Fetch all documents from the "Players" subcollection
        const playersQuerySnapshot = await getDocs(playersCollectionRef);
        const playersData = playersQuerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Player[];
        setPlayersData(playersData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameAndPlayers();
  }, [gameId]);

  return { gameData, playersData, loading, error };
};
