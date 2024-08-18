import { useGame } from "../../../hooks/useGame";

const GameReplay = () => {
  // ID is getting passed in
  const gameID = "mc4vTI1jCuqe1A2l6u4n";
  console.log(useGame(gameID));

  return (
    <div className="section">
      <table className="simpletable">
        <tbody>
          <tr className="simpletable__title">
            <th className="gamereplay__title simpletable__title__field">
              Player
            </th>
            <th className="gametable__title__field simpletable__title__field">
              Attack
              <div className="gamereplay__title__field--wrapper">
                <span>Hit</span>
                <span>Kill</span>
                <span>Error</span>
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
                <span>Error</span>
                <span>Neg.</span>
                <span>Pos.</span>
              </div>
            </th>
          </tr>

          {/* loop here to spit out data */}
          <tr className="simpletable__row">
            <td className="gametable__row__field--player simpletable__row__field">
              Thierry
            </td>
            <td className="gamereplay__row__field">
              <div className="gamereplay__row__field--wrapper">
                <span>1</span>
                <span>3</span>
                <span>5</span>
              </div>
            </td>
            <td className="gamereplay__row__field">
              <div className="gamereplay__row__field--wrapper">
                <span>1</span>
                <span>5</span>
              </div>
            </td>
            <td className="gamereplay__row__field">
              <div className="gamereplay__row__field--wrapper">
                <span>1</span>
                <span>5</span>
              </div>
            </td>
            <td className="gamereplay__row__field">
              <div className="gamereplay__row__field--wrapper">
                <span>1</span>
                <span>3</span>
                <span>5</span>
              </div>
            </td>
          </tr>
          {/* loop here to spit out data */}
        </tbody>
      </table>
    </div>
  );
};

export default GameReplay;
