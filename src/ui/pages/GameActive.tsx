import GameTable from "../components/gametable/GameTable";
import AddStats from "../components/addstats/AddStats";
import SubPlayer from "../components/subplayer/SubPlayer";

export default function Table() {
  return (
    <>
      <GameTable />
      <AddStats />
      <SubPlayer />
    </>
  );
}
