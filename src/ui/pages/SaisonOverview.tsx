import Title from "../components/title/Title";
import ItemList from "../components/itemlist/ItemList";
import Header from "../components/header/Header";

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
      <Header />
      <Title titleName="Übersicht Saisons" back={true} subtitle={""} />
      <ItemList items={item} />
    </>
  );
}
