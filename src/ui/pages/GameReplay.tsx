import Title from "../components/title/Title";
import GameReplay from "../components/gamereplay/GameReplay";

export default function Table() {
  return (
    <>
      <Title titleName="VBC March vs. VBC Limmattal" back={true} />
      <GameReplay />
    </>
  );
}
