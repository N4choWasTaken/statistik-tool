import Title from "../components/title/Title";
import db from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSeason } from "../../hooks/useSeason";
import { Game } from "../../hooks/useGame";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";

export default function SaisonOverview() {
  const queryParameters = new URLSearchParams(window.location.search);
  const seasonid = queryParameters.get("seasonid") ?? "";
  const seasonData = useSeason(seasonid);

  const seasonGamesData = seasonData?.gameData;
  const [items, setItems] = useState<
    {
      date: string;
      gameFinished: boolean;
      key: string;
      name: string;
      href: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchGameItems = async () => {
      if (!seasonGamesData) return; // Avoid fetching if no game data

      try {
        const items = await Promise.all(
          seasonGamesData.map(async (game: { gameId: string }) => {
            const gameDocRef = doc(db, "Games", game.gameId);
            const gameDocSnap = await getDoc(gameDocRef);
            if (!gameDocSnap.exists()) {
              throw new Error("Game not found");
            }

            const gameData = {
              id: gameDocSnap.id,
              ...gameDocSnap.data(),
            } as Game;

            return {
              key: gameData.id,
              name: `${gameData.homeTeam} vs ${gameData.guestTeam}`,
              href: gameData.gameFinished
                ? `/game-replay?gameid=${gameData.id}`
                : `/game-active?gameid=${gameData.id}`,
              gameFinished: gameData.gameFinished,
              date: new Date(gameData.date.toDate()).toUTCString(),
            };
          })
        );
        setItems(items);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGameItems();
  }, [seasonGamesData]); // Added seasonGamesData as a dependency

  return (
    <>
      <Header />
      <Title
        titleName={seasonData?.seasonData?.SeasonTitle}
        back={true}
        subtitle=""
      />
      <div className="section">
        <div className="itemlist__seasondetail__link__wrapper">
          {items.length === 0 && (
            <a className="itemlist__link--notice" href="/">
              No Games in this Season yet!
            </a>
          )}
          {items
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((item) => (
              <a
                key={item.key}
                className="itemlist__seasondetail__link"
                href={item.href}
              >
                <div className="itemlist__seasondetail__link__text">
                  <span className="itemlist__seasondetail__link__date">
                    {item.date.toString().slice(4, 16)}
                  </span>
                  {item.name}
                </div>
                {item.gameFinished ? (
                  <svg
                    style={{ marginLeft: "10px" }}
                    width="23"
                    height="12"
                    viewBox="0 0 23 12"
                    fill="none"
                    xmlns="http:www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.25004H0.25V6.75004H1V5.25004ZM22.5303 6.53037C22.8232 6.23748 22.8232 5.7626 22.5303 5.46971L17.7574 0.696739C17.4645 0.403839 16.9896 0.403839 16.6967 0.696739C16.4038 0.989639 16.4038 1.46454 16.6967 1.75744L20.9393 6.00004L16.6967 10.2427C16.4038 10.5356 16.4038 11.0104 16.6967 11.3033C16.9896 11.5962 17.4645 11.5962 17.7574 11.3033L22.5303 6.53037ZM1 6.75004L22 6.75004V5.25004L1 5.25004V6.75004Z"
                      fill="black"
                    />
                  </svg>
                ) : (
                  <svg
                    style={{ marginLeft: "10px" }}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http:www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5851 17.9696H0.643397C0.288199 17.9696 0 17.6816 0 17.326V3.38424C0 3.02884 0.288199 2.74084 0.643397 2.74084H7.61417C7.96957 2.74084 8.25757 3.02904 8.25757 3.38424C8.25757 3.73943 7.96937 4.02763 7.61417 4.02763H1.28699V16.6826H13.9417V10.355C13.9417 9.99961 14.2299 9.71161 14.5851 9.71161C14.9405 9.71161 15.2285 9.99981 15.2285 10.355V17.326C15.2287 17.6816 14.9405 17.9696 14.5851 17.9696Z"
                      fill="black"
                    />
                    <path
                      d="M17.8117 2.19164L15.8063 0.188249C15.5553 -0.0627497 15.1479 -0.0627497 14.8969 0.188249L6.07917 9.00801C6.02117 9.06601 5.97417 9.13461 5.94198 9.20961L4.44278 12.7122C4.33758 12.9546 4.39338 13.2356 4.57798 13.42C4.70238 13.5444 4.86538 13.6088 5.03278 13.6088C5.11858 13.6088 5.20438 13.5916 5.28798 13.5574L8.79056 12.0582C8.86556 12.026 8.93436 11.9788 8.99216 11.921L17.8119 3.10344C18.0627 2.85004 18.0627 2.44264 17.8117 2.19164ZM6.25717 11.7428L6.84277 10.3786L7.62137 11.1572L6.25717 11.7428ZM8.38496 10.709L7.29117 9.61521L13.6013 3.30484L14.6953 4.39863L8.38496 10.709ZM15.3021 3.79163L14.2083 2.69784L15.3515 1.55464L16.4453 2.64644L15.3021 3.79163Z"
                      fill="black"
                    />
                  </svg>
                )}
              </a>
            ))}
        </div>
      </div>
    </>
  );
}
