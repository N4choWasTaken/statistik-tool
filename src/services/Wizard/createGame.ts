/**
 * Date, Teams -> collection
 * Player subcollection (User ref + active + stats)
 */

import { Timestamp, addDoc, collection } from "firebase/firestore";
import db from '../../firebase';
import { Player } from "./selectPlayers";

export type PlayerWithStats = Player & {attack: {error: number, kill: number, hits: number}, block: {error: number, kill: number}, service: {error: number, ace: number}, receive: {error: number, positive: number, negative: number}}

export async function createGame(date: Timestamp, homeTeam: string, guestTeam: string, players: Player[]) {
    try {
        // check if user has selected at least 6 players
        if (players.length < 6) {
            alert("You need at least 6 players to start a game");
            return;
        }

        // create a new game document
        const newGameRef = await addDoc(collection(db, "Games"), {date, homeTeam, guestTeam});

        // create a subcollection for players
        const playerCollectionRef = collection(newGameRef, "Players");

        // add active players to the subcollection
        players.map(player => {
            player.active = true;
            addDoc(playerCollectionRef, addStatsToPlayer(player));
        })

        // redirect to the active game with the new game id
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