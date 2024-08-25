import { useEffect, useState } from "react";
import { useGame } from "../../../hooks/useGame";
import useStore, { PlayerStore } from "../../../stores/StatsStore";
import {
  loadStore,
  saveStore,
} from "../../../services/store/StatsStoreService";
import SubPlayer from "../subplayer/SubPlayer";
import AddStats from "../addstats/AddStats";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../../firebase";

const GameTable = () => {
  // get gameId from url parameter gameid
  const queryParameters = new URLSearchParams(window.location.search);
  const gameid = queryParameters.get("gameid") ?? "";
  const game = useGame(gameid);
  const gameTitle = game.gameData
    ? `${game.gameData.homeTeam} vs. ${game.gameData.guestTeam}`
    : "";

  const players = useStore(
    (state: PlayerStore) => state.players as unknown as Player[]
  );

  const updatePlayer = useStore((state: PlayerStore) => state.updatePlayers);

  useEffect(() => {
    async function handle() {
      updatePlayer(await loadStore(gameid));
    }

    handle();
  }, []);

  // state for player data
  const [playerData, setPlayerData] = useState<null | unknown>(null);
  const [statMode, setStatMode] = useState<string | null>(null);
  const [statModeFields, setStatModeFields] = useState<object>({});

  const isGameFinished = game.gameData?.gameFinished;

  if (isGameFinished) {
    window.location.replace(`/game-replay?gameid=${gameid}`);
  }

  const handleStatClick = (
    player: unknown,
    statMode: string,
    statModeFields: object
  ) => {
    setPlayerData(player);
    setStatMode(statMode);
    setStatModeFields(statModeFields);
    document.querySelector(".gametable")?.classList.add("d-none");
    document.querySelector(".addstats")?.classList.remove("d-none");
  };

  const handleSubPlayerClick = (player: unknown) => {
    setPlayerData(player);
    document.querySelector(".gametable")?.classList.add("d-none");
    document.querySelector(".subplayer")?.classList.remove("d-none");
  };

  // beforeUnload event, to prevent accidental page reload, update the store with saveStore
  window.addEventListener("beforeunload", async (event) => {
    event.preventDefault();
  });

  async function finishGame() {
    saveStore(gameid, players);

    try {
      // Reference the specific game document in the "Games" collection using gameid
      const gameRef = doc(db, "Games", gameid);

      // Optionally, you can retrieve the document first if you need to validate or check something
      const gameDoc = await getDoc(gameRef);

      if (gameDoc.exists()) {
        // Update the gameFinished field to true
        await updateDoc(gameRef, {
          gameFinished: true,
        });

        console.log("Game finished successfully");
        window.location.href = `/game-replay?gameid=${gameid}`;
      } else {
        console.log("No such game found");
      }
    } catch (error) {
      console.error("Error finishing the game:", error);
    }
  }

  return (
    <>
      <div className="section">
        <div className="gametable__menu">
          <h3 className="gametable__menu__title">{gameTitle}</h3>
          <div className="gametable__menu__actions">
            <p
              className="gametable__menu__actions--save c-pointer"
              onClick={() => saveStore(gameid, players)}
            >
              Save
            </p>
            {/* todo: finish game, sets gameFinished true and saves all stats as is. */}
            <p
              className="gametable__menu__actions--finish c-pointer"
              onClick={() => finishGame()}
            >
              Finish
            </p>
          </div>
        </div>
        <table className="gametable simpletable tablehightlight">
          <tbody>
            <tr className="simpletable__title">
              <th className="simpletable__title__field">Player</th>
              <th className="gametable__title__field simpletable__title__field">
                Attack
              </th>
              <th className="gametable__title__field simpletable__title__field">
                Block
              </th>
              <th className="gametable__title__field simpletable__title__field">
                Service
              </th>
              <th className="gametable__title__field simpletable__title__field">
                Receive
              </th>
              <th className="gametable__title__field simpletable__title__field"></th>
            </tr>

            {/* loop here to spit out data */}
            {players.map(
              (player) =>
                // if player.active is true show the player in the table
                player.active && (
                  <tr
                    className="simpletable__row"
                    id={player.id?.toString()}
                    key={player.id?.toString()}
                  >
                    <td className="gametable__row__field--player simpletable__row__field">
                      <span>{player.Name}</span> <span>#{player.Number}</span>
                    </td>
                    <td
                      className="gametable__row__field simpletable__row__field c-pointer text-select-none"
                      onClick={() =>
                        handleStatClick(player, "attack", player.attack)
                      }
                    >
                      A
                    </td>
                    <td
                      className="gametable__row__field simpletable__row__field c-pointer text-select-none"
                      onClick={() =>
                        handleStatClick(player, "block", player.block)
                      }
                    >
                      B
                    </td>
                    <td
                      className="gametable__row__field simpletable__row__field c-pointer text-select-none"
                      onClick={() =>
                        handleStatClick(player, "service", player.service)
                      }
                    >
                      S
                    </td>
                    <td
                      className="gametable__row__field simpletable__row__field c-pointer text-select-none"
                      onClick={() =>
                        handleStatClick(player, "receive", player.receive)
                      }
                    >
                      R
                    </td>
                    <td
                      className="gametable__row__field simpletable__row__field c-pointer text-select-none"
                      onClick={() => handleSubPlayerClick(player)}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.36011 1V0.5H3.36011V1H4.36011ZM3.50655 17.3536C3.70182 17.5488 4.0184 17.5488 4.21366 17.3536L7.39564 14.1716C7.5909 13.9763 7.5909 13.6597 7.39564 13.4645C7.20038 13.2692 6.8838 13.2692 6.68853 13.4645L3.86011 16.2929L1.03168 13.4645C0.836418 13.2692 0.519836 13.2692 0.324574 13.4645C0.129311 13.6597 0.129311 13.9763 0.324574 14.1716L3.50655 17.3536ZM13.3979 17V17.5H14.3979V17H13.3979ZM14.2515 0.646447C14.0562 0.451184 13.7396 0.451184 13.5444 0.646447L10.3624 3.82843C10.1671 4.02369 10.1671 4.34027 10.3624 4.53553C10.5577 4.7308 10.8742 4.7308 11.0695 4.53553L13.8979 1.70711L16.7264 4.53553C16.9216 4.7308 17.2382 4.7308 17.4335 4.53553C17.6287 4.34027 17.6287 4.02369 17.4335 3.82843L14.2515 0.646447ZM3.36011 1V17H4.36011V1H3.36011ZM14.3979 17V1H13.3979V17H14.3979Z"
                          fill="black"
                        />
                      </svg>
                    </td>
                  </tr>
                )
            )}
            {/* loop here to spit out data */}
          </tbody>
        </table>
      </div>
      <AddStats
        player={playerData}
        statMode={statMode ?? ""}
        statModeFields={statModeFields}
        gameid={gameid}
      />
      <SubPlayer player={playerData} />
    </>
  );
};

export default GameTable;
