import Title from '../components/title/Title';
import usePlayers from '../../hooks/usePlayers';
import { ReactNode } from 'react';
import Header from '../components/header/Header';
import { useAuth } from '../../auth/authContext';
import { useGetUserData } from '../../hooks/useGetUserData';
import { editMvpStat } from '../../services/upload/editMvpStat';

type Props = {
  playerId: string;
};

export default function PlayerDetail({ playerId }: Props) {
  const { players, loading, error } = usePlayers();
  const playerID = playerId;
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

  const { currentUser } = useAuth() || {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
  };

  // @ts-ignore
  const userData = useGetUserData(currentUser?.uid ?? '');

  if (!userData) {
    return (
      <div className="loader__wrapper">
        <div className="loader">🏐</div>
      </div>
    );
  }

  players.forEach((possiblePlayer) => {
    if (possiblePlayer.id === playerID) {
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

  const changeMVPStat = async (operation: string) => {
    //@ts-ignore
    await editMvpStat(operation, playerID, players);
    window.location.reload();
  };

  return (
    <>
      <Header />
      <Title
        titleName={`${player.Name} #${player.Number}`}
        back={true}
        subtitle=""
      />
      {/* Overall */}
      <div className="section">
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
                {player.attack.kill + player.block.kill + player.service.ace}
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
      <div className="section">
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
              <td className="simpletable__row__field">Attack Efficency</td>
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
      <div className="section">
        <table className="simpletable tablehightlight">
          <tbody>
            <tr className="simpletable__title">
              <th className="simpletable__title__field--playerdetail">Block</th>
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
      <div className="section">
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
              <td className="simpletable__row__field">Service Efficency</td>
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
      <div className="section">
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
      {userData.role == 'admin' || userData.role == 'moderator' ? (
        <div className="gamereplay__admincontrols section">
          <h3>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '10px' }}
            >
              <path
                d="M10.94 20H9.05C8.60444 20 8.17712 19.823 7.86206 19.5079C7.547 19.1929 7.37 18.7656 7.37 18.32V17.23C7.36458 17.1658 7.34103 17.1044 7.30208 17.0531C7.26313 17.0017 7.21038 16.9625 7.15 16.94C7.08881 16.9008 7.01767 16.88 6.945 16.88C6.87233 16.88 6.80119 16.9008 6.74 16.94L6 17.74C5.84478 17.8963 5.66016 18.0204 5.45678 18.105C5.25341 18.1897 5.03529 18.2333 4.815 18.2333C4.59471 18.2333 4.37659 18.1897 4.17322 18.105C3.96984 18.0204 3.78522 17.8963 3.63 17.74L2.26 16.4C2.10142 16.2451 1.97547 16.06 1.8896 15.8556C1.80372 15.6512 1.75966 15.4317 1.76 15.21C1.76064 14.7565 1.94034 14.3217 2.26 14L3 13.26C3.03573 13.2049 3.05474 13.1407 3.05474 13.075C3.05474 13.0093 3.03573 12.9451 3 12.89C2.94 12.74 2.84 12.63 2.7 12.63H1.68C1.23352 12.6274 0.806226 12.4481 0.491449 12.1315C0.176672 11.8148 -7.81621e-06 11.3865 2.59619e-10 10.94V9.05C2.59619e-10 8.60444 0.177 8.17712 0.492061 7.86206C0.807122 7.547 1.23444 7.37 1.68 7.37H2.77C2.83422 7.36458 2.89558 7.34103 2.94692 7.30208C2.99827 7.26313 3.03748 7.21038 3.06 7.15C3.0992 7.08881 3.12004 7.01767 3.12004 6.945C3.12004 6.87233 3.0992 6.80119 3.06 6.74L2.26 6C2.10368 5.84478 1.97962 5.66016 1.89497 5.45678C1.81031 5.25341 1.76672 5.03529 1.76672 4.815C1.76672 4.59471 1.81031 4.37659 1.89497 4.17322C1.97962 3.96984 2.10368 3.78522 2.26 3.63L3.6 2.26C3.7534 2.10217 3.93682 1.97663 4.13947 1.89076C4.34212 1.80489 4.55991 1.76043 4.78 1.76C5.00625 1.75901 5.23046 1.80266 5.43981 1.88846C5.64916 1.97426 5.83952 2.10051 6 2.26L6.74 3C6.79509 3.03573 6.85934 3.05474 6.925 3.05474C6.99066 3.05474 7.05491 3.03573 7.11 3C7.26 2.94 7.37 2.84 7.37 2.7V1.68C7.37264 1.23352 7.55186 0.806226 7.86851 0.491449C8.18516 0.176672 8.61351 -7.81621e-06 9.06 2.59309e-10H11C11.4456 2.59309e-10 11.8729 0.177 12.1879 0.492061C12.503 0.807122 12.68 1.23444 12.68 1.68V2.77C12.6854 2.83422 12.709 2.89558 12.7479 2.94692C12.7869 2.99827 12.8396 3.03748 12.9 3.06C12.9612 3.0992 13.0323 3.12004 13.105 3.12004C13.1777 3.12004 13.2488 3.0992 13.31 3.06L14 2.26C14.1552 2.10368 14.3398 1.97962 14.5432 1.89497C14.7466 1.81031 14.9647 1.76672 15.185 1.76672C15.4053 1.76672 15.6234 1.81031 15.8268 1.89497C16.0302 1.97962 16.2148 2.10368 16.37 2.26L17.74 3.6C17.8981 3.75526 18.0238 3.94043 18.1096 4.14474C18.1955 4.34905 18.2398 4.56839 18.24 4.79C18.2448 5.01529 18.2029 5.23914 18.1168 5.44741C18.0308 5.65567 17.9025 5.84383 17.74 6L17 6.74C16.9643 6.79509 16.9453 6.85934 16.9453 6.925C16.9453 6.99066 16.9643 7.05491 17 7.11C17.06 7.26 17.16 7.37 17.3 7.37H18.39C18.8242 7.39058 19.2338 7.57767 19.5336 7.89241C19.8335 8.20714 20.0005 8.62531 20 9.06V11C20 11.4456 19.823 11.8729 19.5079 12.1879C19.1929 12.503 18.7656 12.68 18.32 12.68H17.23C17.1658 12.6854 17.1044 12.709 17.0531 12.7479C17.0017 12.7869 16.9625 12.8396 16.94 12.9C16.9043 12.9551 16.8853 13.0193 16.8853 13.085C16.8853 13.1507 16.9043 13.2149 16.94 13.27L17.71 14.04C17.8663 14.1952 17.9904 14.3798 18.075 14.5832C18.1597 14.7866 18.2033 15.0047 18.2033 15.225C18.2033 15.4453 18.1597 15.6634 18.075 15.8668C17.9904 16.0702 17.8663 16.2548 17.71 16.41L16.4 17.74C16.2466 17.8978 16.0632 18.0234 15.8605 18.1092C15.6579 18.1951 15.4401 18.2396 15.22 18.24C14.7735 18.2341 14.3467 18.0548 14.03 17.74L13.26 17C13.2049 16.9643 13.1407 16.9453 13.075 16.9453C13.0093 16.9453 12.9451 16.9643 12.89 17C12.74 17.06 12.63 17.16 12.63 17.3V18.39C12.6094 18.8242 12.4223 19.2338 12.1076 19.5336C11.7929 19.8335 11.3747 20.0005 10.94 20ZM9.37 18H10.63V17.23C10.6343 16.7689 10.7753 16.3193 11.0352 15.9384C11.2951 15.5574 11.6622 15.2622 12.09 15.09C12.5196 14.9022 12.9953 14.8467 13.4566 14.9304C13.9179 15.0141 14.3438 15.2333 14.68 15.56L15.22 16.1L16.1 15.22L15.56 14.67C15.2353 14.3389 15.0164 13.9188 14.9309 13.463C14.8454 13.0072 14.8973 12.5362 15.08 12.11C15.2537 11.684 15.5497 11.3191 15.9305 11.061C16.3113 10.803 16.76 10.6634 17.22 10.66H18V9.37H17.23C16.7689 9.36574 16.3193 9.22473 15.9384 8.96483C15.5574 8.70493 15.2622 8.33782 15.09 7.91C14.9022 7.48043 14.8467 7.00467 14.9304 6.54339C15.0141 6.0821 15.2333 5.6562 15.56 5.32L16.1 4.78L15.22 3.9L14.67 4.44C14.3337 4.74716 13.9167 4.95185 13.468 5.02995C13.0193 5.10806 12.5576 5.05633 12.1373 4.88086C11.717 4.70539 11.3556 4.41348 11.0957 4.03952C10.8357 3.66555 10.688 3.22509 10.67 2.77V2H9.37V2.77C9.36574 3.23115 9.22473 3.68066 8.96483 4.06161C8.70493 4.44256 8.33782 4.73782 7.91 4.91C7.48043 5.09777 7.00467 5.15335 6.54339 5.06964C6.0821 4.98593 5.6562 4.76673 5.32 4.44L4.78 3.9L3.9 4.78L4.44 5.33C4.74716 5.66627 4.95185 6.08331 5.02995 6.53201C5.10806 6.98071 5.05633 7.44238 4.88086 7.86267C4.70539 8.28296 4.41348 8.64436 4.03952 8.90431C3.66555 9.16427 3.22509 9.31196 2.77 9.33H2V10.59H2.77C3.23115 10.5943 3.68066 10.7353 4.06161 10.9952C4.44256 11.2551 4.73782 11.6222 4.91 12.05C5.09777 12.4796 5.15335 12.9553 5.06964 13.4166C4.98593 13.8779 4.76673 14.3038 4.44 14.64L3.9 15.18L4.78 16.06L5.33 15.52C5.66627 15.2128 6.08331 15.0082 6.53201 14.93C6.98071 14.8519 7.44238 14.9037 7.86267 15.0791C8.28296 15.2546 8.64436 15.5465 8.90431 15.9205C9.16427 16.2945 9.31196 16.7349 9.33 17.19L9.37 18Z"
                fill="#000"
              />
              <path
                d="M10 13.5C9.30779 13.5 8.63111 13.2947 8.05553 12.9101C7.47996 12.5255 7.03136 11.9789 6.76645 11.3393C6.50154 10.6998 6.43223 9.99607 6.56728 9.31714C6.70233 8.63821 7.03567 8.01457 7.52515 7.52508C8.01464 7.0356 8.63828 6.70226 9.31721 6.56721C9.99615 6.43216 10.6999 6.50147 11.3394 6.76638C11.979 7.03128 12.5256 7.47989 12.9102 8.05546C13.2948 8.63103 13.5 9.30772 13.5 9.99996C13.5 10.9282 13.1313 11.8185 12.4749 12.4748C11.8185 13.1312 10.9283 13.5 10 13.5ZM10 8.49996C9.70336 8.49996 9.41335 8.58793 9.16667 8.75275C8.92 8.91757 8.72774 9.15184 8.61421 9.42593C8.50068 9.70002 8.47097 10.0016 8.52885 10.2926C8.58673 10.5836 8.72959 10.8508 8.93937 11.0606C9.14915 11.2704 9.41642 11.4133 9.70739 11.4711C9.99837 11.529 10.3 11.4993 10.5741 11.3858C10.8481 11.2722 11.0824 11.08 11.2472 10.8333C11.4121 10.5866 11.5 10.2966 11.5 9.99996C11.5 9.60213 11.342 9.2206 11.0607 8.9393C10.7794 8.65799 10.3979 8.49996 10 8.49996Z"
                fill="#000"
              />
            </svg>
            Admin Controls
          </h3>
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <button
              onClick={() => changeMVPStat('subtract')}
              className="gamereplay__admincontrols--btn"
              style={{ borderRadius: '1rem 0 0 1rem' }}
            >
              -
            </button>
            <button
              className="gamereplay__admincontrols--btn"
              style={{ borderRadius: '0' }}
            >
              MVP
            </button>
            <button
              onClick={() => changeMVPStat('add')}
              className="gamereplay__admincontrols--btn"
              style={{ borderRadius: '0 1rem 1rem 0' }}
            >
              +
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
