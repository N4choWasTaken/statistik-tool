import { create } from "zustand";
import { PlayerWithStats } from "../services/Wizard/createGame";

const useStore = create((set) => ({
    players: [],
    updatePlayers: (newPlayers: PlayerWithStats) => set({players: newPlayers})
}))