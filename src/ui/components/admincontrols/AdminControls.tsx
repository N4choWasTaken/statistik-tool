import usePlayers from '../../../hooks/usePlayers';
import { resetGlobalPlayerStats } from '../../../services/upload/resetGlobalPlayerStats';

const Profile = () => {
  const { players, loading, error } = usePlayers();

  const resetStats = () => {
    // create a prompt if the user is sure they want to reset the stats
    if (
      !window.confirm(
        'Are you sure? This action cannot be undone. Are you really really reeeeaaally sure???'
      )
    ) {
      return;
    }
    // @ts-ignore
    resetGlobalPlayerStats(players);
  };

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
            resetStats();
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
