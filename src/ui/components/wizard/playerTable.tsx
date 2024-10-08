import {
  Player,
  setActivePlayers,
} from "../../../services/Wizard/selectPlayers";

interface PlayerTableProps {
  players: Player[];
  active: Player[];
  setActive: (value: Player[]) => void;
}

let selectedCounter = 0;

const PlayerTable = ({ players, active, setActive }: PlayerTableProps) => {
  function onSelect(player: Player) {
    const newActive = setActivePlayers(active, player);

    if (!newActive) return;

    setActive(newActive);
  }

  function isActive(player: Player) {
    selectedCounter = active.length;
    return active.some((p) => p.id === player.id);
  }

  return (
    <div className="section">
      <table className="simpletable playerTableSelection">
        <tbody>
          <tr className="simpletable__title">
            <th className="simpletable__title__field">
              Players: ({selectedCounter})
            </th>
            <th className="simpletable__title__field"></th>
          </tr>

          {players
            .sort((a, b) => a.Number - b.Number)
            .map((player) => (
              <tr
                onClick={() => onSelect(player)}
                className={
                  isActive(player)
                    ? "simpletable__row--active c-pointer"
                    : "c-pointer"
                }
                key={player.id}
              >
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
