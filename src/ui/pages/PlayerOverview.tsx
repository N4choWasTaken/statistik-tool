import Title from "../components/title/Title";
import usePlayers from "../../hooks/usePlayers";
import Header from "../components/header/Header";

export default function PlayerOverview() {
  const { players, loading, error } = usePlayers();

  if (loading)
    return (
      <div className="loader__wrapper">
        <div className="loader">🏐</div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Header />
      <Title titleName="Overview players" back={true} subtitle="" />
      <div className="section">
        <table className="simpletable tablehightlight">
          <tbody>
            <tr className="simpletable__title">
              <th className="simpletable__title__field--playerdetail">
                Players
              </th>
              <th className="simpletable__title__field--playerdetail"></th>
            </tr>
            {/* loop here to spit out data */}
            {/* sort players by Number */}
            {players
              .sort((a, b) => a.Number - b.Number)
              .map((player) => (
                <tr
                  className="simpletable__row"
                  key={player.id}
                  onClick={() =>
                    (window.location.href = `/player/${player.id}`)
                  }
                >
                  <td className="simpletable__row__field">{player.Name}</td>
                  <td className="simpletable__row__field">#{player.Number}</td>
                </tr>
              ))}
            {/* loop here to spit out data */}
          </tbody>
        </table>
      </div>
    </>
  );
}
