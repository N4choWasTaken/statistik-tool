import { User } from "../../../hooks/usePlayers";

interface PlayerTableProps {
    players: User[]
}

const PlayerTable = (props: PlayerTableProps) => {
  return (
    <div className="section">
      <table className="simpletable">
        <tbody>
          <tr className="simpletable__title">
            <th className="simpletable__title__field">Players</th>
            <th className="simpletable__title__field"></th>
          </tr>

          {props.players.map((player) => (
            <tr className="simpletable__row" key={player.id}>
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
