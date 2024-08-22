import Title from "../components/title/Title";
import ItemList from "../components/itemlist/ItemList";
import { useSeason } from "../../hooks/useSeason";

export default function SaisonOverview() {
  const queryParameters = new URLSearchParams(window.location.search);
  const seasonid = queryParameters.get("seasonid") ?? "";
  const seasonData = useSeason(seasonid);

  const seasonGamesData = seasonData?.gameData;

  const item = seasonGamesData?.map((game, index) => {
    return {
      key: index,
      name: game.gameTitle,
      href: game.gameFinished
        ? `http://localhost:5173/game-replay?gameid=${game.gameId}`
        : `http://localhost:5173/game-active?gameid=${game.gameId}`,
    };
  });

  return (
    <>
      <Title titleName={seasonData?.seasonData?.SeasonTitle} back={true} />
      <ItemList items={item} />
    </>
  );
}
