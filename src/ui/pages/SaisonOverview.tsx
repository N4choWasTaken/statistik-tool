import Title from "../components/title/Title";
import ItemList from "../components/itemlist/ItemList";

const item = [
  {
    key: 1,
    name: "Season 2024/25",
    href: "/season-detail/Season-24-25?seasonid=Season-24-25",
  },
];

export default function SaisonOverview() {
  return (
    <>
      <Title titleName="Übersicht Saisons" back={true} />
      <ItemList items={item} />
    </>
  );
}
