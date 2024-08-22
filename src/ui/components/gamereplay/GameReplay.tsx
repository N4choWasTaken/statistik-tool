import { useGame } from "../../../hooks/useGame";
import Title from "../title/Title";

const GameReplay = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const gameid = queryParameters.get("gameid") ?? "";
  const game = useGame(gameid);
  const allPlayers = game?.playersData;

  console.log(game);

  return (
    <>
      <Title
        titleName={`${game?.gameData?.homeTeam} vs. ${game?.gameData?.guestTeam}`}
        back={true}
      />
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
                        {((player.attack.kill - player.attack.error) /
                          player.attack.hits) *
                          100 || 0}
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
    </>
  );
};

export default GameReplay;
