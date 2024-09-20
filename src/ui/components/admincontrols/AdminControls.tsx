import usePlayers from '../../../hooks/usePlayers';
import { resetGlobalPlayerStats } from '../../../services/upload/resetGlobalPlayerStats';

const Profile = () => {
  const { players, loading, error } = usePlayers();

  if (loading)
    return (
      <div className="loader__wrapper">
        <div className="loader">🏐</div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="admincontrols">
        <h3 className="admincontrols__title">Danger Zone</h3>
        <button
          onClick={() => {
            // @ts-ignore
            resetGlobalPlayerStats(players);
          }}
          className="admincontrols__button"
        >
          Reset Player Stats
        </button>
      </div>
    </>
  );
};

export default Profile;
