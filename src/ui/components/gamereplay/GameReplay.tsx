import { useNavigate } from 'react-router-dom';
import { useGame } from '../../../hooks/useGame';
import { useGetUserData } from '../../../hooks/useGetUserData';
import { useState } from 'react';
import { useAuth } from '../../../auth/authContext';
import { editYouTubeLink } from '../../../services/upload/editYouTubeLink';

const GameReplay = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const gameid = queryParameters.get('gameid') ?? '';
  const game = useGame(gameid);
  const gameTitle = `${game?.gameData?.homeTeam} vs. ${game?.gameData?.guestTeam}`;
  const allPlayers = game?.playersData;
  // convert date to readable format
  const date = new Date(game?.gameData?.date.toDate())
    .toUTCString()
    .toString()
    .slice(4, 16);

  const navigate = useNavigate();

  const { currentUser } = useAuth() || {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
  };

  const [ytLink, setytLink] = useState('');

  // @ts-ignore
  const userData = useGetUserData(currentUser?.uid ?? '');

  if (!userData) {
    return (
      <div className="loader__wrapper">
        <div className="loader">🏐</div>
      </div>
    );
  }

  const setYoutubeLink = async () => {
    if (ytLink !== '' && gameid !== '') {
      await editYouTubeLink(ytLink, gameid);
      setytLink('');
      // reload page to show updated data
      window.location.reload();
    }
  };

  return (
    <>
      {gameTitle !== 'undefined vs. undefined' ? (
        <div>
          <div className="section">
            <div className="title">
              <div className="title__title">
                <div className="back c-pointer">
                  <a
                    onClick={() =>
                      // if previous page was game-active, then redirect to home, else navigate(-1)
                      document.referrer.includes('game-active')
                        ? navigate('/')
                        : navigate(-1)
                    }
                  >
                    <svg
                      width="23"
                      height="12"
                      viewBox="0 0 23 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 6.75H22.75V5.25H22V6.75ZM0.46967 5.46967C0.176777 5.76256 0.176777 6.23744 0.46967 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.46967 5.46967ZM22 5.25H1V6.75H22V5.25Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                </div>

                <h3>{gameTitle}</h3>
              </div>
              <p className="title__subtitle">
                <a
                  className="gamereplay__links"
                  target="_blank"
                  href={game.gameData?.youtubeLink}
                >
                  <svg
                    height="28px"
                    width="28px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 461.001 461.001"
                  >
                    <g>
                      <path
                        style={{ fill: '#014228' }}
                        d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
		c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
		C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
		c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
                      />
                    </g>
                  </svg>
                </a>
                {date}
              </p>
            </div>
          </div>
          <div className="section">
            <table className="simpletable tablehightlight">
              <tbody>
                <tr className="simpletable__title">
                  <th className="gamereplay__title simpletable__title__field">
                    Player
                  </th>
                  <th className="gametable__title__field simpletable__title__field">
                    Attack
                    <div className="gamereplay__title__field--wrapper">
                      <span>Hits</span>
                      <span>Kills</span>
                      <span>Error</span>
                      <span>Kill%</span>
                      <span>Effi.</span>
                    </div>
                  </th>
                  <th className="gametable__title__field simpletable__title__field">
                    Block
                    <div className="gamereplay__title__field--wrapper">
                      <span>Kill</span>
                      <span>Error</span>
                    </div>
                  </th>
                  <th className="gametable__title__field simpletable__title__field">
                    Service
                    <div className="gamereplay__title__field--wrapper">
                      <span>Neutral</span>
                      <span>Ace</span>
                      <span>Error</span>
                    </div>
                  </th>
                  <th className="gametable__title__field simpletable__title__field">
                    Receive
                    <div className="gamereplay__title__field--wrapper">
                      <span>Pos.</span>
                      <span>Neg.</span>
                      <span>Error</span>
                    </div>
                  </th>
                </tr>

                {allPlayers?.map((player) => {
                  return (
                    <tr className="simpletable__row" key={player.id}>
                      <td className="gametable__row__field--player simpletable__row__field">
                        {player.Name}
                      </td>
                      <td className="gamereplay__row__field">
                        <div className="gamereplay__row__field--wrapper">
                          <span>{player.attack.hits}</span>
                          <span>{player.attack.kill}</span>
                          <span>{player.attack.error}</span>
                          <span>
                            {Math.max(
                              (player.attack.kill / player.attack.hits) * 100 ||
                                0,
                              0
                            ).toFixed(0)}
                            %
                          </span>
                          <span>
                            {Math.max(
                              ((player.attack.kill - player.attack.error) /
                                player.attack.hits) *
                                100 || 0,
                              0
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                      </td>
                      <td className="gamereplay__row__field">
                        <div className="gamereplay__row__field--wrapper">
                          <span>{player.block.kill}</span>
                          <span>{player.block.error}</span>
                        </div>
                      </td>
                      <td className="gamereplay__row__field">
                        <div className="gamereplay__row__field--wrapper">
                          <span>{player.service.neutral}</span>
                          <span>{player.service.ace}</span>
                          <span>{player.service.error}</span>
                        </div>
                      </td>
                      <td className="gamereplay__row__field">
                        <div className="gamereplay__row__field--wrapper">
                          <span>{player.receive.positive}</span>
                          <span>{player.receive.negative}</span>
                          <span>{player.receive.error}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {/* loop here to spit out data */}
              </tbody>
            </table>
            {userData.role == 'admin' ? (
              <div className="gamereplay__admincontrols">
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
                <div className="wizard__input__field">
                  <input
                    id="hometeam"
                    className="wizard__input"
                    type="text"
                    placeholder=" "
                    value={ytLink}
                    onChange={(e) => setytLink(e.target.value)}
                  />
                  <label className="wizard__label" htmlFor="hometeam">
                    YouTube Link
                  </label>
                </div>
                <button
                  onClick={() => setYoutubeLink()}
                  className="gamereplay__admincontrols--btn"
                >
                  <svg
                    width="15"
                    height="18"
                    viewBox="0 0 15 20"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: '10px' }}
                  >
                    <path d="M14.063 17.9941H0.941471C0.692895 17.9941 0.454502 18.0998 0.278732 18.2878C0.102963 18.4759 0.00421697 18.731 0.00421697 18.997C0.00421697 19.263 0.102963 19.5181 0.278732 19.7062C0.454502 19.8942 0.692895 19.9999 0.941471 19.9999H14.063C14.3116 19.9999 14.55 19.8942 14.7258 19.7062C14.9015 19.5181 15.0003 19.263 15.0003 18.997C15.0003 18.731 14.9015 18.4759 14.7258 18.2878C14.55 18.0998 14.3116 17.9941 14.063 17.9941Z" />
                    <path d="M0.941193 15.9884H1.02555L4.93389 15.6073C5.36203 15.5617 5.76246 15.3598 6.06797 15.0357L14.5033 6.0096C14.8307 5.63949 15.0076 5.14561 14.9953 4.63617C14.983 4.12672 14.7825 3.64327 14.4376 3.29175L11.8696 0.543811C11.5344 0.206934 11.0952 0.0136389 10.6355 0.000694764C10.1758 -0.0122494 9.72774 0.156061 9.37648 0.473609L0.941193 9.49967C0.63824 9.82658 0.449608 10.2551 0.406958 10.7132L0.00393923 14.8953C-0.00868655 15.0421 0.0091263 15.1902 0.0561079 15.3289C0.103089 15.4676 0.178083 15.5935 0.275743 15.6976C0.36332 15.7905 0.467183 15.8641 0.581375 15.914C0.695568 15.9639 0.817844 15.9892 0.941193 15.9884ZM10.5668 1.94787L13.1255 4.68577L11.251 6.64142L8.73914 3.95366L10.5668 1.94787ZM2.22523 10.8837L7.50197 5.27748L10.0326 7.9853L4.78393 13.6015L1.97217 13.8823L2.22523 10.8837Z" />
                  </svg>
                  Change
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="section">
          <a className="itemlist__link--error" href="/">
            No games found, please select a valid game
          </a>
        </div>
      )}
    </>
  );
};

export default GameReplay;
