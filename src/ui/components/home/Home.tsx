import ItemList from "../itemlist/ItemList";

const item = [
  { key: 1, name: "New Game", href: "/wizard" },
  { key: 2, name: "Überblick Saisons", href: "/overview-saison" },
  { key: 3, name: "Überblick Players", href: "/overview-players" },
];

const Home = () => {
  return (
    <>
      <div className="home section">
        <h1>VBC Limmattal HU23</h1>
      </div>
      <ItemList items={item} />
    </>
  );
};

export default Home;
