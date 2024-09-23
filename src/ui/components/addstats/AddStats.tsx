import useStore, { PlayerStore } from '../../../stores/StatsStore';

interface Player {
  Name: string;
  Number: number;
}

const AddStats = ({
  player,
  statMode,
  statModeFields,
  onBack,
}: {
  player: Player;
  statMode: string;
  statModeFields: { [key: string]: unknown };
  gameid: string;
  onBack: () => void;
}) => {
  const players = useStore(
    (state: PlayerStore) => state.players as unknown as Player[]
  );

  const updatePlayer = useStore((state: PlayerStore) => state.updatePlayers);

  if (!player) return null;

  const orderStatModeFields = Object.keys(statModeFields)
    .sort()
    .reduce((obj: { [key: string]: unknown }, key: string) => {
      obj[key] = statModeFields[key];
      return obj;
    }, {});

  const addStatOnClick = (key: string) => {
    // Find the player in the players array
    const playerIndex = players.findIndex(
      (p) => p.Name === player.Name && p.Number === player.Number
    );

    if (playerIndex === -1) return; // Player not found, do nothing

    // Get the correct player and statMode
    const selectedPlayer = players[playerIndex];

    // Dynamically increase the value of the specific stat (e.g., attack.error or service.ace)
    if (
      //@ts-ignore
      selectedPlayer[statMode] &&
      //@ts-ignore
      selectedPlayer[statMode][key] !== undefined
    ) {
      if ((statMode == 'attack' && key == 'error') || key == 'kill') {
        //@ts-ignore
        selectedPlayer[statMode][key] =
          //@ts-ignore
          (selectedPlayer[statMode][key] as number) + 1;
        //@ts-ignore
        selectedPlayer.attack.hits = (selectedPlayer.attack.hits as number) + 1;
      } else if ((statMode == 'service' && key == 'ace') || key == 'error') {
        //@ts-ignore
        selectedPlayer[statMode][key] =
          //@ts-ignore
          (selectedPlayer[statMode][key] as number) + 1;
        //@ts-ignore
        selectedPlayer.service.neutral =
          //@ts-ignore
          (selectedPlayer.service.neutral as number) + 1;
      } else {
        //@ts-ignore
        selectedPlayer[statMode][key] =
          //@ts-ignore
          (selectedPlayer[statMode][key] as number) + 1;
      }
    }

    // Create a copy of the players array to avoid direct mutation
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex] = { ...selectedPlayer };

    // Now, update the store with the modified players array
    //@ts-ignore
    updatePlayer(updatedPlayers);
    onBack();
  };

  return (
    <div className={statMode ? 'section addstats' : 'section d-none addstats'}>
      <table className="simpletable">
        <tbody>
          <tr className="simpletable__title">
            <th className="simpletable__title__field">
              <a className="addstats__title__field--back" onClick={onBack}>
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
              <span className="cappitalize">{statMode}</span> - {player.Name} #
              {player.Number}
            </th>
          </tr>

          <tr className="addstats__row simpletable__row">
            {
              /* loop through here to spit out data, use key as title and value as text */
              Object.entries(orderStatModeFields).map(([key, value]) => (
                <td
                  className="addstats__row__field simpletable__row__field c-pointer text-select-none"
                  key={key}
                  onClick={() => addStatOnClick(key)}
                >
                  <div className="addstats__row__field--wrapper c-pointer">
                    <h3 className="addstats__row__field--title cappitalize">
                      {key}
                    </h3>
                    <p className="addstats__row__field--stat cappitalize">
                      {(value as string).toString()}
                    </p>
                  </div>
                </td>
              ))
            }
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddStats;
