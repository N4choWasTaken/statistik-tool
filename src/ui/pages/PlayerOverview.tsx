import Title from "../components/title/Title";
import usePlayers from "../../hooks/usePlayers";
import ItemList from "../components/itemlist/ItemList";

export default function PlayerOverview() {
  const { players, loading, error } = usePlayers();
  console.log(players);
  const item = players.map((player) => ({
    key: String(player.id),
    name: `${player.Name} #${player.Number}`,
    href: `/player/${player.id}`,
  }));

  if (loading)
    return (
      <div className="loader__wrapper">
        <div className="loader">🏐</div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Title titleName="Übersicht Players" back={true} />
      <ItemList items={item} />
    </>
  );
}
