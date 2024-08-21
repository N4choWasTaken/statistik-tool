import withNavigation from "../../../hoc/withNavigation";
import usePlayers from "../../../hooks/usePlayers";
import { mapToPlayer, Player } from "../../../services/Wizard/selectPlayers";
import PlayerTable from "./playerTable";

interface SelectPlayerProps {
  active: Player[];
  setActive: (value: Player[]) => void;
}

const selectPlayers = (props: SelectPlayerProps) => {
  const { players, loading, error } = usePlayers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <PlayerTable
        players={mapToPlayer(players)}
        active={props.active}
        setActive={props.setActive}
      />
    </>
  );
};

export default withNavigation(selectPlayers);
