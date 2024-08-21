import { Player, setActivePlayers } from "../../../services/Wizard/selectPlayers";

interface PlayerTableProps {
    players: Player[]
    active: Player[]
    setActive: (value: Player[]) => void
}

const PlayerTable = ({ players, active, setActive }: PlayerTableProps) => {

  console.log(active)

    function onSelect(player: Player, e: any) {

        const newActive = setActivePlayers(active, player);

        if(!newActive)
            return

        console.log(e)
        setActive(newActive)

    }

    function isActive(player: Player) {
      return active.some(p => p.id === player.id)
    }

  return (
    <div className="section">
      <table className="simpletable">
        <tbody>
          <tr className="simpletable__title">
            <th className="simpletable__title__field">Players</th>
            <th className="simpletable__title__field"></th>
          </tr>

          {players.map((player) => (
            <tr onClick={(e) => onSelect(player, e)} className={isActive(player) ? "simpletable__row--active" :"simpletable__row"} key={player.id}>
              <td className="simpletable__row__field">{player.Name}</td>
              <td className="simpletable__row__field">#{player.Number}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;
