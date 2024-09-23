import { doc, setDoc } from 'firebase/firestore';
import db from '../../firebase';

export const editYouTubeLink = async (
  ytLink: string,
  gameId: string
): Promise<void> => {
  try {
    const gameDocRef = doc(db, 'Games', gameId);

    await setDoc(gameDocRef, { youtubeLink: ytLink }, { merge: true });
  } catch (error) {
    console.error('Error reseting player data: ', error);
    throw error;
  }
};
