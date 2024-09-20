import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import db from '../../firebase';

interface StatCategory {
  [key: string]: number;
}

interface Player {
  id: string;
  name: string;
  age: number;
  position: string;
  team: string;
  attack: StatCategory;
  block: StatCategory;
  service: StatCategory;
  receive: StatCategory;
  gamesPlayed: number; // Added gamesPlayed field
  mvp: number; // Added mvp field
}

export const resetGlobalPlayerStats = async (
  players: Player[]
): Promise<void> => {
  try {
    const playerCollectionRef = collection(db, 'Players');

    await Promise.all(
      players.map(async (player) => {
        const playerDocRef = doc(playerCollectionRef, player.id);

        // Fetch the existing player data from Firestore
        const playerSnapshot = await getDoc(playerDocRef);
        // set all stats to 0
        // @ts-ignore
        const updatedPlayerData: Player = {
          ...playerSnapshot.data(),
          attack: {
            kill: 0,
            error: 0,
            hits: 0,
          },
          block: {
            error: 0,
            kill: 0,
          },
          service: {
            ace: 0,
            error: 0,
            neutral: 0,
          },
          receive: {
            error: 0,
            negative: 0,
            positive: 0,
          },
          gamesPlayed: 0,
          mvp: 0,
        };

        // Save the updated player data back to Firestore
        await setDoc(playerDocRef, updatedPlayerData);
      })
    );
  } catch (error) {
    console.error('Error reseting player data: ', error);
    throw error;
  }
};
