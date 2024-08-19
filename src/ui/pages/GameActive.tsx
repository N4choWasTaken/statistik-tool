import Title from "../components/title/Title";
import GameTable from "../components/gametable/GameTable";
import AddStats from "../components/addstats/AddStats";
import SubPlayer from "../components/subplayer/SubPlayer";

export default function Table() {
  return (
    <>
      <Title titleName="VBC March vs. VBC Limmattal" back={false} />
      <GameTable />
      <AddStats />
      <SubPlayer />
    </>
  );
}
