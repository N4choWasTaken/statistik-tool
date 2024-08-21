import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, DocumentReference } from "firebase/firestore";
import db from "../firebase";
import { Timestamp } from "firebase/firestore";
import { User } from './usePlayers';

export interface Game {
  [x: string]: any;
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

export interface ResolvedPlayer extends Player {
  Number: ReactNode;
  Name: ReactNode;
  playerDetails?: User; 
}

export const useGame = (gameId: string) => {
  const [gameData, setGameData] = useState<Game | null>(null);
  const [playersData, setPlayersData] = useState<ResolvedPlayer[]>([]);
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

        // Resolve player references
        const playersData = await Promise.all(playersQuerySnapshot.docs.map(async (playerDoc) => {
          const playerData = playerDoc.data() as Player;

          // Check if the Player field is a DocumentReference and fetch its details
          if (playerData.Player instanceof DocumentReference) {
            const playerRefDocSnap = await getDoc(playerData.Player);
            if (playerRefDocSnap.exists()) {
              return {
                ...playerData,
                id: playerDoc.id,
                playerDetails: playerRefDocSnap.data() as User,
              };
            }
          }

          // If it's not a DocumentReference, just return the player data as is
          return {
            ...playerData,
            id: playerDoc.id,
          };
        }));

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
