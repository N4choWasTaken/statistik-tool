/**
 * Date, Teams -> collection
 * Player subcollection (User ref + active + stats)
 */

import db from '../../firebase';
import { Player } from "./selectPlayers";
import { Timestamp, setDoc, doc, addDoc, collection } from "firebase/firestore";

export type PlayerWithStats = Player & { 
    attack: { error: number, kill: number, hits: number },
    block: { error: number, kill: number },
    service: { error: number, ace: number },
    receive: { error: number, positive: number, negative: number }
}

export async function createGame(date: Timestamp, homeTeam: string, guestTeam: string, players: Player[], gameFinished: boolean) {
    try {
        // Check if user has selected at least 6 players and homeTeam and guestTeam are defined
        if (players.length < 6 || !homeTeam || !guestTeam) {
            return;
        }

        // Create a new game document
        const newGameRef = await addDoc(collection(db, "Games"), {
            date, homeTeam, guestTeam, gameFinished,
            youtubeLink: "https://www.youtube.com/playlist?list=PL33YIE1L3ZpjeioenKAsaWc153jVsNyIg&playnext=1&index=1"
        });

        // Create a subcollection for players
        const playerCollectionRef = collection(newGameRef, "Players");
        
        // Add game id to the season's game collection
        await addDoc(collection(db, "Seasons/Season-24-25/GamesCollection"), { gameId: newGameRef.id });

        // Add active players to the subcollection
        await Promise.all(players.map(async (player) => {
            // Add the player stats
            player.active = true;
            const playerWithStats = addStatsToPlayer(player);
            
            // Use `setDoc` to set player with specific ID (assuming player.id exists)
            const playerDocRef = doc(playerCollectionRef, player.id); // Set the document ID to player.id
            await setDoc(playerDocRef, playerWithStats); // Write the player data to the document with the custom ID
        }));

        // Redirect to the active game with the new game id
        window.location.href = `/game-active?gameid=${newGameRef.id}`;

    } catch (e) {
        console.error("Error writing document: ", e);
    }
}

function addStatsToPlayer(player: Player): PlayerWithStats {
    return {
        ...player,
        attack: { error: 0, kill: 0, hits: 0 },
        block: { error: 0, kill: 0 },
        service: { error: 0, ace: 0 },
        receive: { error: 0, positive: 0, negative: 0 }
    };
}
