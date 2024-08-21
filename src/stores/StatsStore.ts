import { create } from "zustand";
import { PlayerWithStats } from "../services/Wizard/createGame";

export interface PlayerStore {
    players: PlayerWithStats[];
    updatePlayers: (newPlayers: PlayerWithStats[]) => void; // Adjusted to accept an array of players
}

const useStore = create<PlayerStore>((set) => ({
    players: [],
    updatePlayers: (newPlayers: PlayerWithStats[]) => set({players: newPlayers})
}))

export default useStore