import { useGame } from "../../../hooks/useGame";

const GameReplay = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const gameid = queryParameters.get("gameid") ?? "";
  const game = useGame(gameid);
  const gameTitle = `${game?.gameData?.homeTeam} vs. ${game?.gameData?.guestTeam}`;
  const allPlayers = game?.playersData;
  // convert date to readable format
  const date = new Date(game?.gameData?.date.toDate())
    .toUTCString()
    .toString()
    .slice(4, 16);

  return (
    <>
      {gameTitle !== "undefined vs. undefined" ? (
        <div>
          <div className="section">
            <div className="title">
              <div className="title__title">
                <div className="back c-pointer">
                  <a href="/season-detail/Season-24-25?seasonid=Season-24-25">
                    <svg
                      width="23"
                      height="12"
                      viewBox="0 0 23 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 6.75H22.75V5.25H22V6.75ZM0.46967 5.46967C0.176777 5.76256 0.176777 6.23744 0.46967 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.46967 5.46967ZM22 5.25H1V6.75H22V5.25Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                </div>

                <h3>{gameTitle}</h3>
              </div>
              <p className="title__subtitle">
                <a
                  className="gamereplay__links"
                  target="_blank"
                  href={game.gameData?.youtubeLink}
                >
                  <svg
                    height="28px"
                    width="28px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 461.001 461.001"
                  >
                    <g>
                      <path
                        style={{ fill: "#014228" }}
                        d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
		c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
		C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
		c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
                      />
                    </g>
                  </svg>
                </a>
                {date}
              </p>
            </div>
          </div>
          <div className="section">
            <table className="simpletable tablehightlight">
              <tbody>
                <tr className="simpletable__title">
                  <th className="gamereplay__title simpletable__title__field">
                    Player
                  </th>
                  <th className="gametable__title__field simpletable__title__field">
                    Attack
                    <div className="gamereplay__title__field--wrapper">
                      <span>Hits</span>
                      <span>Kills</span>
                      <span>Error</span>
                      <span>Kill%</span>
                      <span>Effi.</span>
                    </div>
                  </th>
                  <th className="gametable__title__field simpletable__title__field">
                    Block
                    <div className="gamereplay__title__field--wrapper">
                      <span>Kill</span>
                      <span>Error</span>
                    </div>
                  </th>
                  <th className="gametable__title__field simpletable__title__field">
                    Service
                    <div className="gamereplay__title__field--wrapper">
                      <span>Ace</span>
                      <span>Error</span>
                    </div>
                  </th>
                  <th className="gametable__title__field simpletable__title__field">
                    Receive
                    <div className="gamereplay__title__field--wrapper">
                      <span>Pos.</span>
                      <span>Neg.</span>
                      <span>Error</span>
                    </div>
                  </th>
                </tr>

                {allPlayers?.map((player) => {
                  return (
                    <tr className="simpletable__row" key={player.id}>
                      <td className="gametable__row__field--player simpletable__row__field">
                        {player.Name}
                      </td>
                      <td className="gamereplay__row__field">
                        <div className="gamereplay__row__field--wrapper">
                          <span>{player.attack.hits}</span>
                          <span>{player.attack.kill}</span>
                          <span>{player.attack.error}</span>
                          <span>
                            {Math.max(
                              (player.attack.kill / player.attack.hits) * 100 ||
                                0,
                              0
                            ).toFixed(0)}
                            %
                          </span>
                          <span>
                            {Math.max(
                              ((player.attack.kill - player.attack.error) /
                                player.attack.hits) *
                                100 || 0,
                              0
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                      </td>
                      <td className="gamereplay__row__field">
                        <div className="gamereplay__row__field--wrapper">
                          <span>{player.block.kill}</span>
                          <span>{player.block.error}</span>
                        </div>
                      </td>
                      <td className="gamereplay__row__field">
                        <div className="gamereplay__row__field--wrapper">
                          <span>{player.service.ace}</span>
                          <span>{player.service.error}</span>
                        </div>
                      </td>
                      <td className="gamereplay__row__field">
                        <div className="gamereplay__row__field--wrapper">
                          <span>{player.receive.positive}</span>
                          <span>{player.receive.negative}</span>
                          <span>{player.receive.error}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {/* loop here to spit out data */}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="section">
          <a className="itemlist__link--error" href="/">
            No games found, please select a valid game
          </a>
        </div>
      )}
    </>
  );
};

export default GameReplay;
