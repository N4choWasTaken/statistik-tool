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
  active?: boolean; // Optional property
}

export const updateGlobalPlayerStats = async (
  players: Player[]
): Promise<void> => {
  try {
    const playerCollectionRef = collection(db, 'Players');

    await Promise.all(
      players.map(async (player) => {
        const playerDocRef = doc(playerCollectionRef, player.id);

        // Fetch the existing player data from Firestore
        const playerSnapshot = await getDoc(playerDocRef);
        const existingPlayerData = playerSnapshot.data();

        // Initialize default stats and gamesPlayed if not present
        const existingStats = {
          attack: existingPlayerData?.attack || { error: 0, kill: 0, hits: 0 },
          block: existingPlayerData?.block || { error: 0, kill: 0 },
          service: existingPlayerData?.service || { neutral: 0, error: 0, ace: 0 },
          receive: existingPlayerData?.receive || {
            error: 0,
            positive: 0,
            negative: 0,
          },
        };

        const existingGamesPlayed = existingPlayerData?.gamesPlayed || 0;

        // Merge the stats
        const mergedStats = {
          attack: mergeStatCategories(existingStats.attack, player.attack),
          block: mergeStatCategories(existingStats.block, player.block),
          service: mergeStatCategories(existingStats.service, player.service),
          receive: mergeStatCategories(existingStats.receive, player.receive),
        };

        // Update gamesPlayed
        const updatedGamesPlayed = (existingGamesPlayed || 0) + 1;

        const {
          active,
          id,
          attack,
          block,
          service,
          receive,
          gamesPlayed,
          ...restOfPlayer
        } = player;
        const updatedPlayerData = {
          ...existingPlayerData,
          ...restOfPlayer, // Update other player fields if necessary
          attack: mergedStats.attack,
          block: mergedStats.block,
          service: mergedStats.service,
          receive: mergedStats.receive,
          gamesPlayed: updatedGamesPlayed, // Update gamesPlayed
        };

        // Save the updated player data back to Firestore
        await setDoc(playerDocRef, updatedPlayerData);
      })
    );

  } catch (error) {
    console.error('Error updating player data: ', error);
    throw error;
  }
};

// Helper function to merge individual stat categories
const mergeStatCategories = (
  existingCategory: StatCategory,
  newCategory: StatCategory
): StatCategory => {
  const mergedCategory: StatCategory = { ...existingCategory };

  for (const key in newCategory) {
    if (newCategory.hasOwnProperty(key)) {
      mergedCategory[key] = (existingCategory[key] || 0) + newCategory[key];
    }
  }

  return mergedCategory;
};
