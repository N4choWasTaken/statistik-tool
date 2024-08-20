import { User } from "../../hooks/usePlayers";

type Player = User & {active: boolean}

function mapToPlayer(users: User[]): Player[] {
    return users.map(u => ({
        id: u.id,
        Name: u.Name,
        Number: u.Number,
        active: false
    }));
}

function setActivePlayers(players: Player[], newPlayer: Player) {
    const isActive = players.some(player => player.id === newPlayer.id)

    if (isActive)
        return players.filter(player => player.id !== newPlayer.id)

    return [...players, newPlayer]
}