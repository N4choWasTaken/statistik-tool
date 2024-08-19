import Title from "../components/title/Title";
import usePlayers from "../../hooks/usePlayers";

type Props = {
  playerId: string;
};

export default function PlayerDetail({ playerId }: Props) {
  const { players, loading, error } = usePlayers();
  const playerID = playerId;
  let player: {
    Number: string;
    Name: string;
  } = {
    Name: "",
    Number: "",
  };

  players.forEach((possiblePlayer) => {
    if (possiblePlayer.id === playerID) {
      player = {
        ...possiblePlayer,
        Number: String(possiblePlayer.Number),
      };
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Title titleName={`${player.Name} #${player.Number}`} back={true} />
    </>
  );
}
