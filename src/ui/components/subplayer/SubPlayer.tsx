import usePlayers from "../../../hooks/usePlayers";

interface Player {
  id: string;
  Name: string;
  Number: number;
  active: boolean;
}

const SubPlayer = ({
  player,
  allPlayers,
}: {
  player: Player;
  allPlayers: unknown;
}) => {
  const { players, loading, error } = usePlayers();
  const allActivePlayers: Player[] = allPlayers as Player[];
  if (!player) return null;

  if (loading)
    return (
      <div className="loader__wrapper">
        <div className="loader">🏐</div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  // loop through all players and filter out the active players
  players.forEach((player) => {
    const tempId = player.id;
    player.active = false;
    allActivePlayers.forEach((activePlayer) => {
      if (tempId === activePlayer.id) {
        player.active = true;
      }
    });
  });

  const handleBack = () => {
    document.querySelector(".gametable")?.classList.remove("d-none");
    document.querySelector(".subplayer")?.classList.add("d-none");
  };

  return (
    <div
      className={allPlayers ? "section subplayer" : "section d-none subplayer"}
    >
      <table className="simpletable tablehightlight">
        <tbody>
          <tr className="simpletable__title">
            <th className="subplayer__title__field simpletable__title__field">
              <a className="addstats__title__field--back" onClick={handleBack}>
                <svg
                  width="23"
                  height="12"
                  viewBox="0 0 23 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 6.75H22.75V5.25H22V6.75ZM0.46967 5.46967C0.176777 5.76256 0.176777 6.23744 0.46967 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.46967 5.46967ZM22 5.25H1V6.75H22V5.25Z"
                    fill="white"
                  />
                </svg>
              </a>
              Select New Player (Old Player -{" "}
              <span className="capitalized">{player.Name}</span> #
              {player.Number})
            </th>
          </tr>

          {/* loop here to spit out data */}
          {players.map((player) => {
            if (!player.active) {
              return (
                <tr className="simpletable__row" key={player.id}>
                  <td className="simpletable__row__field">
                    <span>{player.Name}</span> <span>#{player.Number}</span>
                  </td>
                </tr>
              );
            }
          })}
          {/* loop here to spit out data */}
        </tbody>
      </table>
    </div>
  );
};

export default SubPlayer;
