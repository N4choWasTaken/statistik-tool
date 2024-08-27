import { useEffect, useState } from "react";
import { Player, useGame } from "../../../hooks/useGame";
import useStore, { PlayerStore } from "../../../stores/StatsStore";
import { saveStore } from "../../../services/store/StatsStoreService";
import SubPlayer from "../subplayer/SubPlayer";
import AddStats from "../addstats/AddStats";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../../firebase";
import { updateGlobalPlayerStats } from "../../../services/upload/updateGlobalPlayerStats";
import useAutoSave from "../../../hooks/useAutoSave";
import { PlayerWithStats } from "../../../services/Wizard/createGame";

const GameTable = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const gameid = queryParameters.get("gameid") ?? "";
  const game = useGame(gameid);
  const gameTitle = game.gameData
    ? `${game.gameData.homeTeam} vs. ${game.gameData.guestTeam}`
    : "";

  const players = useStore(
    (state: PlayerStore) => state.players as unknown as Player[]
  );

  useAutoSave("playerData", JSON.stringify(players));
  const updatePlayer = useStore((state: PlayerStore) => state.updatePlayers);

  const saveStoreToDb = (data: PlayerWithStats[]) => {
    saveStore(gameid, data);
    document
      .querySelector(".savedWrapper")
      ?.classList.add("savedWrapper__show");
    setTimeout(() => {
      document
        .querySelector(".savedWrapper")
        ?.classList.remove("savedWrapper__show");
    }, 2300);
  };

  // detect if there was a reload of the page
  useEffect(() => {
    if (performance.navigation.type === 1) {
      // Page reloaded
      const data = JSON.parse(localStorage.getItem("playerData") as string);
      updatePlayer(data);
    }
  }, []);

  const [activeView, setActiveView] = useState<
    "gameTable" | "addStats" | "subPlayer"
  >("gameTable");

  const [playerData, setPlayerData] = useState<null | unknown>(null);
  const [statMode, setStatMode] = useState<string | null>(null);
  const [statModeFields, setStatModeFields] = useState<object>({});

  const [showAddStats, setShowAddStats] = useState(false);
  const [showSubPlayer, setShowSubPlayer] = useState(false);

  const isGameFinished = game.gameData?.gameFinished;

  if (isGameFinished) {
    window.location.replace(`/game-replay?gameid=${gameid}`);
  }

  const handleBackFromAddStats = () => {
    setActiveView("gameTable");
  };

  const handleBackFromSubPlayer = () => {
    setActiveView("gameTable");
  };

  const handleStatClick = (
    player: unknown,
    statMode: string,
    statModeFields: object
  ) => {
    setPlayerData(player);
    setStatMode(statMode);
    setStatModeFields(statModeFields);
    setShowAddStats(true);
    setShowSubPlayer(false);
    setActiveView("addStats");
  };

  const handleSubPlayerClick = (player: unknown) => {
    setPlayerData(player);
    setShowSubPlayer(true);
    setShowAddStats(false);
    setActiveView("subPlayer");
  };

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const finishGame = async () => {
    saveStore(gameid, players);

    try {
      const gameRef = doc(db, "Games", gameid);
      const gameDoc = await getDoc(gameRef);

      if (gameDoc.exists()) {
        await updateDoc(gameRef, {
          gameFinished: true,
        });
        console.log("Game finished successfully");
      } else {
        console.log("No such game found");
      }
    } catch (error) {
      console.error("Error finishing the game:", error);
    }
    await updateGlobalPlayerStats(players);
    window.location.href = `/game-replay?gameid=${gameid}`;
  };

  const handleGameTimeoutClick = async () => {
    await saveStoreToDb(players);
    window.location.href = `/game-timeout?gameid=${gameid}`;
  };

  return (
    <>
      <div className="section">
        {activeView === "gameTable" ? (
          <div>
            {gameTitle ? (
              <div>
                <div className="gametable__menu">
                  <h3 className="gametable__menu__title">{gameTitle}</h3>
                  <div className="gametable__menu__actions">
                    <div className="gametable__menu__actions--timeout">
                      <p
                        onClick={() => handleGameTimeoutClick()}
                        className="gametable__menu__actions c-pointer"
                      >
                        Timeout
                      </p>
                    </div>
                    <div
                      className="gametable__menu__actions--save c-pointer"
                      onClick={() => saveStoreToDb(players)}
                    >
                      <div className="savedWrapper">
                        {" "}
                        <svg
                          className="checkmark"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 52 52"
                        >
                          {" "}
                          <circle
                            className="checkmark__circle"
                            cx="26"
                            cy="26"
                            r="25"
                            fill="none"
                          />{" "}
                          <path
                            className="checkmark__check"
                            fill="none"
                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                          />
                        </svg>
                      </div>
                      <p>Save</p>
                    </div>
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

                    {players.map(
                      (player) =>
                        player.active && (
                          <tr
                            className="simpletable__row"
                            id={player.id?.toString()}
                            key={player.id?.toString()}
                          >
                            <td className="gametable__row__field--player simpletable__row__field">
                              <span>{player.Name}</span>{" "}
                              <span>#{player.Number}</span>
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
                                handleStatClick(
                                  player,
                                  "service",
                                  player.service
                                )
                              }
                            >
                              S
                            </td>
                            <td
                              className="gametable__row__field simpletable__row__field c-pointer text-select-none"
                              onClick={() =>
                                handleStatClick(
                                  player,
                                  "receive",
                                  player.receive
                                )
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
                  </tbody>
                </table>
              </div>
            ) : (
              <a className="itemlist__link--error" href="/">
                No games found, please select a valid game
              </a>
            )}
          </div>
        ) : null}
      </div>
      {activeView === "addStats" && (
        <AddStats
          player={playerData}
          statMode={statMode ?? ""}
          statModeFields={statModeFields}
          gameid={gameid}
          onBack={handleBackFromAddStats}
        />
      )}
      {activeView === "subPlayer" && (
        <SubPlayer player={playerData} onBack={handleBackFromSubPlayer} />
      )}
    </>
  );
};

export default GameTable;
