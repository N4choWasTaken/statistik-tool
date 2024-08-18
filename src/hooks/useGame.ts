import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import db from "../firebase";

export const useGame = (gameId: string) => {
  const [gameData, setGameData] = useState<any | null>(null);
  const [playersData, setPlayersData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        const gameData = { id: gameDocSnap.id, ...gameDocSnap.data() };
        setGameData(gameData);

        // Reference to the "Players" subcollection within that game document
        const playersCollectionRef = collection(gameDocRef, 'Players');

        // Fetch all documents from the "Players" subcollection
        const playersQuerySnapshot = await getDocs(playersCollectionRef);
        const playersData = playersQuerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlayersData(playersData);
      } catch (error) {
        setError(error.mesage);
      } finally {
        setLoading(false);
      }
    };

    fetchGameAndPlayers();
  }, [gameId]);

  return { gameData, playersData, loading, error };
};
