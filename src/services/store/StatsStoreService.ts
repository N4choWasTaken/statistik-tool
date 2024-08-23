import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import db from "../../firebase";
import { PlayerWithStats } from "../Wizard/createGame";

export async function loadStore(gameId: string) {
    try {
        const playersCollectionRef = collection(db, "Games", gameId, "Players");
        const playersSnapshot = await getDocs(playersCollectionRef);

        const players: PlayerWithStats[] = playersSnapshot.docs.map(doc => {
            return doc.data() as PlayerWithStats;
        });

        return players;
    } catch (error) {
        console.error("Error getting players: ", error);
        return [];
    }
}

export async function saveStore(gameId: string, updatedPlayers: PlayerWithStats[]) {
    try {
        const updatePromises = updatedPlayers.map(async (player) => {
            const playerDocRef = doc(db, "Games", gameId, "Players", player.id);
            await setDoc(playerDocRef, player);
        });

        // Wait for all update operations to complete
        await Promise.all(updatePromises);
        console.log("All players updated successfully.");
    } catch (error) {
        console.error("Error updating players: ", error);
    }
}