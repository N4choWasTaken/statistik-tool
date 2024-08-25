import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import db from "../../firebase";

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
  active?: boolean; // Optional property
}

export const updateGlobalPlayerStats = async (players: Player[]): Promise<void> => {
  try {
    const playerCollectionRef = collection(db, "Players");

    await Promise.all(
      players.map(async (player) => {
        const playerDocRef = doc(playerCollectionRef, player.id);

        // Fetch the existing player data from Firestore
        const playerSnapshot = await getDoc(playerDocRef);
        const existingPlayerData = playerSnapshot.data();

        // Initialize default stats if not present
        const existingStats = {
          attack: existingPlayerData?.attack || { error: 0, kill: 0, hits: 0 },
          block: existingPlayerData?.block || { error: 0, kill: 0 },
          service: existingPlayerData?.service || { error: 0, ace: 0 },
          receive: existingPlayerData?.receive || { error: 0, positive: 0, negative: 0 },
        };

        // Merge the stats
        const mergedStats = {
          attack: mergeStatCategories(existingStats.attack, player.attack),
          block: mergeStatCategories(existingStats.block, player.block),
          service: mergeStatCategories(existingStats.service, player.service),
          receive: mergeStatCategories(existingStats.receive, player.receive),
        };

        const { active, id, attack, block, service, receive, ...restOfPlayer } = player;
        const updatedPlayerData = {
          ...existingPlayerData,
          ...restOfPlayer, // Update other player fields if necessary
          ...mergedStats,  // Update merged stats
        };

        // Save the updated player data back to Firestore
        await setDoc(playerDocRef, updatedPlayerData);
      })
    );

    console.log("All player data successfully updated!");
  } catch (error) {
    console.error("Error updating player data: ", error);
    throw error;
  }
};

// Helper function to merge individual stat categories
const mergeStatCategories = (existingCategory: StatCategory, newCategory: StatCategory): StatCategory => {
  const mergedCategory: StatCategory = { ...existingCategory };

  for (const key in newCategory) {
    if (newCategory.hasOwnProperty(key)) {
      mergedCategory[key] = (existingCategory[key] || 0) + newCategory[key];
    }
  }

  return mergedCategory;
};

