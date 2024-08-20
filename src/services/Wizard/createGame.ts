/**
 * Date, Teams -> collection
 * Player subcollection (User ref + active + stats)
 */

import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import db from '../../firebase';
import { Player } from "./selectPlayers";
import { User } from "../../hooks/usePlayers";

export async function createGame(date: Timestamp, homeTeam: string, guestTeam: string, players: User[]) {
    try {

        const id = crypto.randomUUID();

        const newGameRef = await addDoc(collection(db, "Games"), {date, homeTeam, guestTeam});

        const playerCollectionRef = collection(newGameRef, "Players");

        players.map(player => {
            addDoc(playerCollectionRef, player)
        })

    } catch (e) {
        console.error("Error writing document: ", e);
    }
}