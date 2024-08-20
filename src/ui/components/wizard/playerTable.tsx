import { useState } from "react";
import { Player, setActivePlayers } from "../../../services/Wizard/selectPlayers";

interface PlayerTableProps {
    players: Player[]
}

const PlayerTable = (props: PlayerTableProps) => {

    const [active, setActive] = useState<Player[]>([]) //Active Players

    function onSelect(player: Player) {

        const newActive = setActivePlayers(active, player);

        if(!newActive)
            return

        setActive(newActive)
        player.active = !player.active
    }

  return (
    <div className="section">
      <table className="simpletable">
        <tbody>
          <tr className="simpletable__title">
            <th className="simpletable__title__field">Players</th>
            <th className="simpletable__title__field"></th>
          </tr>

          {props.players.map((player) => (
            <tr onClick={() => onSelect(player)} className={player.active? "simpletable__row--active" :"simpletable__row"} key={player.id}>
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
