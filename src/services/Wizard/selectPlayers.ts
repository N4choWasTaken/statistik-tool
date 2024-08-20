import { User } from "../../hooks/usePlayers";

export type Player = User & {active: boolean}

export function mapToPlayer(users: User[]): Player[] {
    return users.map(u => ({
        id: u.id,
        Name: u.Name,
        Number: u.Number,
        active: false
    }));
}

export function setActivePlayers(players: Player[], newPlayer: Player): Player[] | false {
    const isActive = players.some(player => player.id === newPlayer.id)

    if (isActive)
        return players.filter(player => player.id !== newPlayer.id)

    if(checkForAmount(players))
        return false

    return [...players, newPlayer]
}

function checkForAmount(players: Player[]): boolean {
    return players.length == 7
}