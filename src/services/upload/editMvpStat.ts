import { collection, doc, setDoc } from 'firebase/firestore';
import db from '../../firebase';

interface Player {
  id: string;
  mvp: number; // Added mvp field
}

export const editMvpStat = async (
  opperation: string,
  playerId: string,
  players: Player[],
  gameid: string
): Promise<void> => {
  try {
    // Log input parameters
    console.log('Operation:', opperation);
    console.log('Player ID:', playerId);
    console.log('Players:', players);
    console.log('Game ID:', gameid);

    // Validate players array
    if (!Array.isArray(players)) {
      throw new Error('Players must be an array');
    }

    if (gameid !== undefined) {
      const gameDocRef = doc(db, 'Games', gameid);
      // if gameid is set, update the mvp field in the game document to the playerId
      await setDoc(
        gameDocRef,
        {
          mvpId: playerId,
        },
        { merge: true }
      );
    }
    const playerCollectionRef = collection(db, 'Players');
    await Promise.all(
      players.map(async (player) => {
        const playerDocRef = doc(playerCollectionRef, player.id);

        // Ensure mvp is defined
        const mvp = player.mvp ?? 0;

        // if opperation is add, increment the mvp stat by 1, else decrement by 1, do not allow below 0
        if (opperation === 'add') {
          await setDoc(
            playerDocRef,
            {
              mvp: player.id === playerId ? mvp + 1 : mvp,
            },
            { merge: true }
          );
        } else {
          await setDoc(
            playerDocRef,
            {
              mvp: player.id === playerId ? Math.max(mvp - 1, 0) : mvp,
            },
            { merge: true }
          );
        }
      })
    );
  } catch (error) {
    console.error('Error editing mvp on player: ', error);
    throw error;
  }
};
