import { getFirestore, doc, setDoc } from 'firebase/firestore';
// Initialize Firestore
const db = getFirestore();

interface User {
  userUid: string;
  displayName: string;
  number: string;
  role: string;
  email: string;
  playerRef: string;
}

export const setUserRole = async (players: User[], teamName: string) => {
  try {
    players.forEach(async (player: User) => {
      await setDoc(doc(db, teamName, player.userUid), {
        Name: player.displayName,
        Number: player.number,
        attack: {
          kill: 0,
          error: 0,
          hits: 0,
        },
        block: {
          error: 0,
          kill: 0,
        },
        service: {
          ace: 0,
          error: 0,
          neutral: 0,
        },
        receive: {
          error: 0,
          negative: 0,
          positive: 0,
        },
        gamesPlayed: 0,
        mvp: 0,
      });
    });
  } catch (error) {
    console.error('Error setting user role:', error);
  }
};
