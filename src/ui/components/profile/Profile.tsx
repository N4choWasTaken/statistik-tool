import { useAuth } from '../../../auth/authContext';
import { doSignOut, sendResetPasswordEmail } from '../../../auth/auth';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../title/Title';
import { useGetUserData } from '../../../hooks/useGetUserData';
import usePlayers from '../../../hooks/usePlayers';
import { ReactNode } from 'react';
import AdminControls from '../admincontrols/AdminControls';

const Profile = () => {
  const { players, loading, error } = usePlayers();
  const { currentUser } = useAuth() || {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
  };

  //@ts-ignore
  let player: {
    mvp: number;
    gamesPlayed: ReactNode;
    receive: any;
    service: any;
    block: any;
    attack: any;
    Number: string;
    Name: string;
  } = {
    Name: '',
    Number: '',
  };

  const navigate = useNavigate();

  //@ts-ignore
  const userData = useGetUserData(currentUser?.uid ?? '');

  if (!userData) {
    return (
      <div className="loader__wrapper">
        <div className="loader">🏐</div>
      </div>
    );
  }

  players.forEach((possiblePlayer) => {
    if (possiblePlayer.id === userData.playerRef) {
      //@ts-ignore
      player = {
        ...possiblePlayer,
        Number: String(possiblePlayer.Number),
      };
    }
  });

  if (loading)
    return (
      <div className="loader__wrapper">
        <div className="loader">🏐</div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Title titleName="" back={true} subtitle="" />
      <div className="profile section">
        <div className="profile__wrapper">
          <div className="profile__user__img">
            <img src="/pedro-dancing-racoon.gif" alt="profile" />
          </div>
          <h5 className="profile__user__displayname">
            Name: {userData ? `${userData.displayName}` : null}
          </h5>
          <h5 className="profile__user__email">
            E-Mail: {userData ? `${userData.email}` : null}
          </h5>
          <h5 className="profile__user__role">
            Role: {userData ? `${userData.role}` : null}
          </h5>
        </div>
        {userData.role == 'admin' ? (
          <div>
            <AdminControls />
          </div>
        ) : null}
        {player.Name !== '' ? (
          <>
            <div style={{ marginBottom: '24px' }}>
              <table className="simpletable tablehightlight">
                <tbody>
                  <tr className="simpletable__title">
                    <th className="simpletable__title__field--playerdetail">
                      Overall
                    </th>
                    <th className="simpletable__title__field--playerdetail"></th>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Games played</td>
                    <td className="simpletable__row__field text-right">
                      {player.gamesPlayed}
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Points scored</td>
                    <td className="simpletable__row__field text-right">
                      {player.attack.kill +
                        player.block.kill +
                        player.service.ace}
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Errors</td>
                    <td className="simpletable__row__field text-right">
                      {player.attack.error +
                        player.block.error +
                        player.service.error +
                        player.receive.error}
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">MVPs</td>
                    <td className="simpletable__row__field text-right">
                      {player.mvp}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Attack */}
            <div style={{ marginBottom: '24px' }}>
              <table className="simpletable tablehightlight">
                <tbody>
                  <tr className="simpletable__title">
                    <th className="simpletable__title__field--playerdetail">
                      Attack
                    </th>
                    <th className="simpletable__title__field--playerdetail"></th>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Kill %</td>
                    <td className="simpletable__row__field text-right">
                      {Math.max(
                        (player.attack.kill / player.attack.hits) * 100 || 0,
                        0
                      ).toFixed(0)}
                      %
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">
                      Attack Efficency
                    </td>
                    <td className="simpletable__row__field text-right">
                      {Math.max(
                        ((player.attack.kill - player.attack.error) /
                          player.attack.hits) *
                          100 || 0,
                        0
                      ).toFixed(0)}
                      %
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Hits</td>
                    <td className="simpletable__row__field text-right">
                      {player.attack.hits}
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Kills</td>
                    <td className="simpletable__row__field text-right">
                      {player.attack.kill}
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Errors</td>
                    <td className="simpletable__row__field text-right">
                      {player.attack.error}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Block */}
            <div style={{ marginBottom: '24px' }}>
              <table className="simpletable tablehightlight">
                <tbody>
                  <tr className="simpletable__title">
                    <th className="simpletable__title__field--playerdetail">
                      Block
                    </th>
                    <th className="simpletable__title__field--playerdetail"></th>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Kills</td>
                    <td className="simpletable__row__field text-right">
                      {player.block.kill}
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Errors</td>
                    <td className="simpletable__row__field text-right">
                      {player.block.error}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* service */}
            <div style={{ marginBottom: '24px' }}>
              <table className="simpletable tablehightlight">
                <tbody>
                  <tr className="simpletable__title">
                    <th className="simpletable__title__field--playerdetail">
                      Service
                    </th>
                    <th className="simpletable__title__field--playerdetail"></th>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Service %</td>
                    <td className="simpletable__row__field text-right">
                      {Math.max(
                        ((player.service.ace - player.service.error) /
                          player.service.neutral) *
                          100 || 0,
                        0
                      ).toFixed(0)}
                      %
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">
                      Service Efficency
                    </td>
                    <td className="simpletable__row__field text-right">
                      {Math.max(
                        ((player.service.ace - player.service.error) /
                          player.service.neutral) *
                          100 || 0,
                        0
                      ).toFixed(0)}
                      %
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Services</td>
                    <td className="simpletable__row__field text-right">
                      {player.service.neutral}
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Ace</td>
                    <td className="simpletable__row__field text-right">
                      {player.service.ace}
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Errors</td>
                    <td className="simpletable__row__field text-right">
                      {player.service.error}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Receive */}
            <div style={{ marginBottom: '24px' }}>
              <table className="simpletable tablehightlight">
                <tbody>
                  <tr className="simpletable__title">
                    <th className="simpletable__title__field--playerdetail">
                      Receive
                    </th>
                    <th className="simpletable__title__field--playerdetail"></th>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Positive</td>
                    <td className="simpletable__row__field text-right">
                      {player.receive.positive}
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Negative</td>
                    <td className="simpletable__row__field text-right">
                      {player.receive.negative}
                    </td>
                  </tr>
                  <tr className="simpletable__row">
                    <td className="simpletable__row__field">Errors</td>
                    <td className="simpletable__row__field text-right">
                      {player.receive.error}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        <button
          onClick={() => {
            sendResetPasswordEmail(currentUser?.email ?? '').then(() => {
              doSignOut().then(() => {
                navigate('/?reset=true');
              });
            });
          }}
          className="profile__user--reset"
        >
          Reset Password
        </button>
        <button
          onClick={() => {
            doSignOut().then(() => {
              navigate('/');
            });
          }}
          className="profile__user--logout"
        >
          Logout
        </button>
        <div className="profile__legal">
          <p className="login__signup">
            <Link
              to={'/data-privacy'}
              className="text-center text-sm hover:underline font-bold"
            >
              Data Privacy
            </Link>
          </p>
          <p className="login__signup">
            <Link
              to={'/imprint'}
              className="text-center text-sm hover:underline font-bold"
            >
              Imprint
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;
