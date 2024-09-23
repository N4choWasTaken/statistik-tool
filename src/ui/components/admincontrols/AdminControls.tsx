import usePlayers from '../../../hooks/usePlayers';
import { resetGlobalPlayerStats } from '../../../services/upload/resetGlobalPlayerStats';

const Profile = () => {
  const { players, loading, error } = usePlayers();

  const resetStats = async () => {
    // create a prompt if the user is sure they want to reset the stats
    if (
      !window.confirm(
        'Are you sure? This action cannot be undone. Are you really really reeeeaaally sure???'
      )
    ) {
      return;
    }
    // @ts-ignore
    await resetGlobalPlayerStats(players);
    window.location.reload();
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
        <h3 className="admincontrols__title">
          {' '}
          <svg
            width="28"
            height="25"
            viewBox="0 0 28 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: '10px' }}
          >
            <path
              d="M14.25 10.2727L14.1648 16.5455H13.1762L13.0909 10.2727H14.25ZM13.6705 19.0682C13.4602 19.0682 13.2798 18.9929 13.1293 18.8423C12.9787 18.6918 12.9034 18.5114 12.9034 18.3011C12.9034 18.0909 12.9787 17.9105 13.1293 17.7599C13.2798 17.6094 13.4602 17.5341 13.6705 17.5341C13.8807 17.5341 14.0611 17.6094 14.2117 17.7599C14.3622 17.9105 14.4375 18.0909 14.4375 18.3011C14.4375 18.4403 14.402 18.5682 14.331 18.6847C14.2628 18.8011 14.1705 18.8949 14.054 18.9659C13.9404 19.0341 13.8125 19.0682 13.6705 19.0682Z"
              fill="#FF0000"
            />
            <path
              d="M26.0419 19.2117L16.5756 3.36213C15.4116 1.41319 12.5885 1.41318 11.4244 3.36213L1.95813 19.2117C0.763808 21.2114 2.20453 23.75 4.53371 23.75H23.4663C25.7955 23.75 27.2362 21.2114 26.0419 19.2117Z"
              stroke="#FF0000"
              strokeWidth="2"
            />
          </svg>
          Danger Zone
        </h3>
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
