import usePlayers from "../../../hooks/usePlayers";
import { PlayerWithStats } from "../../../services/Wizard/createGame";
import useStore, { PlayerStore } from "../../../stores/StatsStore";

interface Player {
  id: string;
  Name: string;
  Number: number;
  active: boolean;
}

const SubPlayer = ({
  player,
}: {
  player: Player;
}) => {
  let { players } = usePlayers();

  const storePlayers = useStore(
    (state: PlayerStore) => state.players as unknown as Player[]
  );

  const updatePlayer = useStore((state: PlayerStore) => state.updatePlayers);

  if (!player) return null;

  const checkActivePlayers = () => {
    players.forEach((player) => {
      const tempId = player.id;
      player.active = false;
      storePlayers.forEach((activePlayer) => {
        if (tempId === activePlayer.id) {
          player.active = true;
        }
      });
    });
  };

  checkActivePlayers();
  

  const subPlayer = (newPlayer: Player) => {
    // Find the player in the storePlayers array
    const playerStoreIndex = storePlayers.findIndex(
      (p) => p.Name === player.Name && p.Number === player.Number
    );
  
    if (playerStoreIndex === -1) {
      console.error("Player not found in storePlayers!");
      return;
    }
  
    // Log the player found
    console.log("Old Player (store):", storePlayers[playerStoreIndex]);
  
    // Deactivate the current player in the store
    const oldPlayer = storePlayers[playerStoreIndex];
    const updatedOldPlayer = { ...oldPlayer, active: false };
  
    // Log the new player to substitute
    console.log("Subbing in new player:", newPlayer);
  
    // Add stats to the new player
    const playerWithStats: PlayerWithStats = {
      ...newPlayer,
      attack: { error: 0, kill: 0, hits: 0 },
      block: { error: 0, kill: 0 },
      service: { error: 0, ace: 0 },
      receive: { error: 0, positive: 0, negative: 0 },
      active: true,
    };
  
    // Log the updated player with stats
    console.log("New player with stats:", playerWithStats);
  
    // Update the storePlayers array immutably
    const updatedPlayers = storePlayers.map((p, index) =>
      index === playerStoreIndex ? updatedOldPlayer : p
    );
  
    // Add the new player to the store
    const finalPlayers = [...updatedPlayers, playerWithStats];
  
    // Log the final players array before updating
    console.log("Final players array:", finalPlayers);
  
    // Update the store using updatePlayer
    updatePlayer(finalPlayers);
  
    // Re-check active players in the UI
    checkActivePlayers();
  
    // Debug log the players array
    console.log("Updated players:", players);
  };   
  
  const handleBack = () => {
    document.querySelector(".gametable")?.classList.remove("d-none");
    document.querySelector(".subplayer")?.classList.add("d-none");
  };

  return (
    <div
      className={player ? "section subplayer" : "section d-none subplayer"}
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
                <tr onClick={() => subPlayer(player)} className="simpletable__row" key={player.id}>
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
