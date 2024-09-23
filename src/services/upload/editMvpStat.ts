import { collection, doc, setDoc } from 'firebase/firestore';
import db from '../../firebase';

interface Player {
  id: string;
  mvp: number; // Added mvp field
}

export const editMvpStat = async (
  opperation: string,
  playerId: string,
  players: Player[]
): Promise<void> => {
  try {
    const playerCollectionRef = collection(db, 'Players');

    await Promise.all(
      players.map(async (player) => {
        const playerDocRef = doc(playerCollectionRef, player.id);
        // if opperation is add, increment the mvp stat by 1, else decrement by 1
        if (opperation === 'add') {
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
  } catch (error) {
    console.error('Error reseting player data: ', error);
    throw error;
  }
};
