import Title from "../components/title/Title";
import usePlayers from "../../hooks/usePlayers";
import { ReactNode } from "react";
import Header from "../components/header/Header";

type Props = {
  playerId: string;
};

export default function PlayerDetail({ playerId }: Props) {
  const { players, loading, error } = usePlayers();
  const playerID = playerId;
  //@ts-ignore
  let player: {
    gamesPlayed: ReactNode;
    receive: any;
    service: any;
    block: any;
    attack: any;
    Number: string;
    Name: string;
  } = {
    Name: "",
    Number: "",
  };

  players.forEach((possiblePlayer) => {
    if (possiblePlayer.id === playerID) {
      //@ts-ignore
      player = {
        ...possiblePlayer,
        Number: String(possiblePlayer.Number),
      };
    }
  });

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
      <Title
        titleName={`${player.Name} #${player.Number}`}
        back={true}
        subtitle=""
      />
      {/* Overall */}
      <div className="section">
        <table className="simpletable tablehightlight">
          <tbody>
            <tr className="simpletable__title">
              <th className="simpletable__title__field--playerdetail">
                Overall
              </th>
              <th className="simpletable__title__field--playerdetail"></th>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Games played</td>
              <td className="simpletable__row__field">{player.gamesPlayed}</td>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Points scored</td>
              <td className="simpletable__row__field">
                {player.attack.kill + player.block.kill + player.service.ace}
              </td>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Errors</td>
              <td className="simpletable__row__field">
                {player.attack.error +
                  player.block.error +
                  player.service.error +
                  player.receive.error}
              </td>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Kill %</td>
              <td className="simpletable__row__field">
                {Math.max(
                  (player.attack.kill / player.attack.hits) * 100 || 0,
                  0
                ).toFixed(0)}
                %
              </td>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Attack Efficency</td>
              <td className="simpletable__row__field">
                {Math.max(
                  ((player.attack.kill - player.attack.error) /
                    player.attack.hits) *
                    100 || 0,
                  0
                ).toFixed(0)}
                %
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Attack */}
      <div className="section">
        <table className="simpletable tablehightlight">
          <tbody>
            <tr className="simpletable__title">
              <th className="simpletable__title__field--playerdetail">
                Attack
              </th>
              <th className="simpletable__title__field--playerdetail"></th>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Hits</td>
              <td className="simpletable__row__field">{player.attack.hits}</td>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Kills</td>
              <td className="simpletable__row__field">{player.attack.kill}</td>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Errors</td>
              <td className="simpletable__row__field">{player.attack.error}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Block */}
      <div className="section">
        <table className="simpletable tablehightlight">
          <tbody>
            <tr className="simpletable__title">
              <th className="simpletable__title__field--playerdetail">Block</th>
              <th className="simpletable__title__field--playerdetail"></th>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Kills</td>
              <td className="simpletable__row__field">{player.block.kill}</td>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Errors</td>
              <td className="simpletable__row__field">{player.block.error}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* service */}
      <div className="section">
        <table className="simpletable tablehightlight">
          <tbody>
            <tr className="simpletable__title">
              <th className="simpletable__title__field--playerdetail">
                Service
              </th>
              <th className="simpletable__title__field--playerdetail"></th>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Ace</td>
              <td className="simpletable__row__field">{player.service.ace}</td>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Errors</td>
              <td className="simpletable__row__field">
                {player.service.error}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Receive */}
      <div className="section">
        <table className="simpletable tablehightlight">
          <tbody>
            <tr className="simpletable__title">
              <th className="simpletable__title__field--playerdetail">
                Receive
              </th>
              <th className="simpletable__title__field--playerdetail"></th>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Positive</td>
              <td className="simpletable__row__field">
                {player.receive.positive}
              </td>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Negative</td>
              <td className="simpletable__row__field">
                {player.receive.negative}
              </td>
            </tr>
            <tr className="simpletable__row">
              <td className="simpletable__row__field">Errors</td>
              <td className="simpletable__row__field">
                {player.receive.error}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
