import Title from "../components/title/Title";
import ItemList from "../components/itemlist/ItemList";

const item = [
  { key: 1, name: "VBC March vs. VBC Limmattal", href: "/game-replay/gameID" },
  { key: 2, name: "VBC March vs. VBC Limmattal", href: "/game-replay/gameID" },
  { key: 3, name: "VBC March vs. VBC Limmattal", href: "/game-replay/gameID" },
];

export default function SaisonOverview() {
  return (
    <>
      <Title titleName="Saison 24/25" back={true} />
      <ItemList items={item} />
    </>
  );
}
