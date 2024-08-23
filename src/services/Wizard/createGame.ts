/**
 * Date, Teams -> collection
 * Player subcollection (User ref + active + stats)
 */

import { Timestamp, addDoc, collection } from "firebase/firestore";
import db from '../../firebase';
import { Player } from "./selectPlayers";

export type PlayerWithStats = Player & {attack: {error: number, kill: number, hits: number}, block: {error: number, kill: number}, service: {error: number, ace: number}, receive: {error: number, positive: number, negative: number}}

export async function createGame(date: Timestamp, homeTeam: string, guestTeam: string, players: Player[], gameFinished: boolean) {
    try {
        // check if user has selected at least 6 players and homeTeam and guestTeam are defined
        if (players.length < 6 || !homeTeam || !guestTeam) {
            return;
        }

        // create a new game document
        const newGameRef = await addDoc(collection(db, "Games"), {date, homeTeam, guestTeam, gameFinished, youtubeLink: "https://www.youtube.com/playlist?list=PL33YIE1L3ZpjeioenKAsaWc153jVsNyIg&playnext=1&index=1"});

        // create a subcollection for players
        const playerCollectionRef = collection(newGameRef, "Players");
        // add game id to the season's game collection
        await addDoc(collection(db, "Seasons/Season-24-25/GamesCollection"), {gameId: newGameRef.id});

        // add active players to the subcollection
        // wait for every player to be loaded with promise, then redirect to the active game with the new game id
        await Promise.all(players.map(async (player) => {
            player.active = true;
            await addDoc(playerCollectionRef, addStatsToPlayer(player));
        }));

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