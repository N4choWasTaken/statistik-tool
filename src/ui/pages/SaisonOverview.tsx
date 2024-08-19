import Title from "../components/title/Title";
import ItemList from "../components/itemlist/ItemList";

const item = [
  { key: 1, name: "Saison 24/25", href: "/saison-detail/saisonID" },
  { key: 2, name: "Saison 23/24", href: "/saison-detail/saisonID" },
  { key: 3, name: "Saison 22/23", href: "/saison-detail/saisonID" },
];

export default function SaisonOverview() {
  return (
    <>
      <Title titleName="Übersicht Saisons" back={true} />
      <ItemList items={item} />
    </>
  );
}
