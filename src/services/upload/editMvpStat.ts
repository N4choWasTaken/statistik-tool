import { collection, doc, setDoc } from 'firebase/firestore';
import db from '../../firebase';

interface Player {
  id: string;
  mvp: number; // Added mvp field
}

export const editMvpStat = async (
  operation: string,
  playerId: string,
  players: Player[],
  gameid: string
): Promise<void> => {
  try {
    if (gameid !== '') {
      const gameDocRef = doc(db, 'Games', gameid);
      // if gameid is set, update the mvp field in the game document to the playerId
      await setDoc(
        gameDocRef,
        {
          mvpId: playerId,
        },
        { merge: true }
      );

      const playerCollectionRef = collection(db, 'Players');
      await Promise.all(
        players.map(async (player) => {
          const playerDocRef = doc(playerCollectionRef, player.id);
          // if operation is add, increment the mvp stat by 1, else decrement by 1
          if (operation === 'add') {
            await setDoc(
              playerDocRef,
              {
                mvp: player.id === playerId ? player.mvp + 1 : player.mvp,
              },
              { merge: true }
            );
          } else {
            await setDoc(
              playerDocRef,
              {
                mvp: player.id === playerId ? player.mvp - 1 : player.mvp,
              },
              { merge: true }
            );
          }
        })
      );
    }
  } catch (error) {
    console.error('Error reseting player data: ', error);
    throw error;
  }
};
