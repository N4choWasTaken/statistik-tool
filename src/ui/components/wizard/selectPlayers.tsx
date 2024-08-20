import withNavigation from "../../../hoc/withNavigation";
import usePlayers from "../../../hooks/usePlayers";
import PlayerTable from "./playerTable";

const selectPlayers:React.FC = () => {
    const { players, loading, error } = usePlayers();
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <>
            <PlayerTable players={players} />
        </>
    );
}

export default withNavigation(selectPlayers);