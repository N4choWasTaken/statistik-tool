import { useState } from "react";
import withNavigation from "../../../hoc/withNavigation";
import usePlayers from "../../../hooks/usePlayers";
import { mapToPlayer, Player } from "../../../services/Wizard/selectPlayers";
import PlayerTable from "./playerTable";

const selectPlayers:React.FC = () => {
    const { players, loading, error } = usePlayers();
    const [active, setActive] = useState<Player[]>([]) //Active Players
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <>
            <PlayerTable players={mapToPlayer(players)} active={active} setActive={setActive} />
        </>
    );
}

export default withNavigation(selectPlayers);