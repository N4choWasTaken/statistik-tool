import usePlayers from "../../../hooks/usePlayers";

const SimpleTable = () => {
  const { players, loading, error } = usePlayers();
  console.log(players);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="section">
      <table className="simpletable">
        <tbody>
          <tr className="simpletable__title">
            <th className="simpletable__title__field">Players</th>
            <th className="simpletable__title__field"></th>
          </tr>

          {/* loop here to spit out data */}
          {players.map((player) => (
            <tr className="simpletable__row" key={player.id}>
              <td className="simpletable__row__field">{player.Name}</td>
              <td className="simpletable__row__field">#{player.Number}</td>
            </tr>
          ))}
          {/* loop here to spit out data */}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
