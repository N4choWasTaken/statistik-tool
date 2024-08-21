/**
 * Date, Teams -> collection
 * Player subcollection (User ref + active + stats)
 */

import { Timestamp, addDoc, collection } from "firebase/firestore";
import db from '../../firebase';
import { Player } from "./selectPlayers";

export async function createGame(date: Timestamp, homeTeam: string, guestTeam: string, players: Player[]) {
    try {

        const newGameRef = await addDoc(collection(db, "Games"), {date, homeTeam, guestTeam});

        const playerCollectionRef = collection(newGameRef, "Players");

        players.map(player => {
            player.active = true;
            addDoc(playerCollectionRef, player)
        })

    } catch (e) {
        console.error("Error writing document: ", e);
    }
}