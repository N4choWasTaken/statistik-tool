import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { Timestamp } from "firebase/firestore";

export interface Season {
  [x: string]: any;
  id: string;
  Date: Timestamp;
  Hometeam: string;
  Guestteam: string;
}

export interface GameId {
  gameTitle: any;
  gameFinished: any;
  gameId: any;
  GameId: string;
}

export const useSeason = (seasonId: string) => {
  const [seasonData, setSeasonData] = useState<Season | null>(null);
  const [gameData, setGameData] = useState<GameId[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGameAndPlayers = async () => {
      try {
        setLoading(true);

        // Reference to the game document
        const seasonDocRef = doc(db, 'Seasons', seasonId);

        // Fetch the game document data
        const seasonDocSnap = await getDoc(seasonDocRef);
        if (!seasonDocSnap.exists()) {
          throw new Error('season not found');
        }
        const seasonData = { id: seasonDocSnap.id, ...seasonDocSnap.data() } as Season;
        setSeasonData(seasonData);

        // Reference to the "Players" subcollection within that game document
        const gamesCollectionRef = collection(seasonDocRef, 'GamesCollection');

        // Fetch all documents from the "Players" subcollection
        const gamesQuerySnapshot = await getDocs(gamesCollectionRef);

        const gameData = await Promise.all(gamesQuerySnapshot.docs.map(async (gameDoc) => {
            return gameDoc.data() as GameId;
        }));
        
        setGameData(gameData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameAndPlayers();
  }, [seasonId]);

  return { seasonData, gameData, loading, error };
};
