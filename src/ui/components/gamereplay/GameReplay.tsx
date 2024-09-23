import { useNavigate } from 'react-router-dom';
import { useGame } from '../../../hooks/useGame';
import { useGetUserData } from '../../../hooks/useGetUserData';
import { useState } from 'react';
import { useAuth } from '../../../auth/authContext';
import { editYouTubeLink } from '../../../services/upload/editYouTubeLink';
import { editMvpStat } from '../../../services/upload/editMvpStat';
import { deleteGlobalGame } from '../../../services/upload/deleteGlobalGame';

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

  const changeMVPStat = async (operation: string, playerID: string) => {
    //@ts-ignore
    await editMvpStat(operation, playerID, allPlayers, gameid);
    window.location.reload();
  };

  const deleteGame = async () => {
    if (
      !window.confirm(
        'Are you sure? This action cannot be undone. Are you really really reeeeaaally sure???'
      )
    ) {
      return;
    }
    //@ts-ignore
    await deleteGlobalGame(gameid, allPlayers);
    window.location.href = '/';
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
                        style={{ fill: '#000' }}
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
                        {}
                        {game.gameData?.mvpId == player.id &&
                        game.gameData?.mvpId != null ? (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginLeft: '10px' }}
                          >
                            <path
                              d="M9.86923 0.93343L11.8994 5.04707C12.0406 5.33318 12.3135 5.53143 12.6293 5.57723L17.1691 6.23693C17.9643 6.35258 18.2816 7.32955 17.7064 7.89013L14.4214 11.0921C14.1931 11.3148 14.0888 11.6358 14.1428 11.9501L14.9182 16.4715C15.0541 17.2633 14.2228 17.8671 13.5117 17.4935L9.45133 15.359C9.16898 15.2107 8.83143 15.2107 8.54908 15.359L4.48875 17.4935C3.77761 17.8675 2.94632 17.2633 3.08224 16.4715L3.85759 11.9501C3.91166 11.6358 3.80727 11.3148 3.57899 11.0921L0.294008 7.89013C-0.281211 7.32917 0.0360604 6.3522 0.831305 6.23693L5.37111 5.57723C5.68687 5.53143 5.95984 5.33318 6.10102 5.04707L8.13118 0.93343C8.48637 0.212904 9.51366 0.212904 9.86923 0.93343Z"
                              fill="#ED8A19"
                            />
                          </svg>
                        ) : null}
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
            {userData.role == 'admin' || userData.role == 'moderator' ? (
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
                <div
                  className={
                    game.gameData?.mvpId != '' && game.gameData?.mvpId != null
                      ? 'gamereplay__admincontrols--mvp gamereplay__admincontrols--mvp-disabled'
                      : 'gamereplay__admincontrols--mvp'
                  }
                >
                  <h5>
                    {game.gameData?.mvpId != '' &&
                    game.gameData?.mvpId != null ? (
                      <svg
                        width="19"
                        height="22"
                        viewBox="0 0 19 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginRight: '10px' }}
                      >
                        <path
                          d="M15.4375 6.51483H14.25V4.42433C14.25 3.25093 13.7496 2.12558 12.8588 1.29586C11.968 0.466134 10.7598 0 9.5 0C8.24022 0 7.03204 0.466134 6.14124 1.29586C5.25044 2.12558 4.75 3.25093 4.75 4.42433V6.51483H3.5625C2.61767 6.51483 1.71153 6.86443 1.04343 7.48672C0.375334 8.10902 0 8.95303 0 9.83308V18.6817C0 19.5618 0.375334 20.4058 1.04343 21.0281C1.71153 21.6504 2.61767 22 3.5625 22H15.4375C16.3823 22 17.2885 21.6504 17.9566 21.0281C18.6247 20.4058 19 19.5618 19 18.6817V9.83308C19 8.95303 18.6247 8.10902 17.9566 7.48672C17.2885 6.86443 16.3823 6.51483 15.4375 6.51483ZM7.125 4.42433C7.10903 3.82185 7.34997 3.238 7.79509 2.8006C8.2402 2.3632 8.85324 2.10787 9.5 2.0905C10.1468 2.10787 10.7598 2.3632 11.2049 2.8006C11.65 3.238 11.891 3.82185 11.875 4.42433V6.51483H7.125V4.42433ZM16.625 18.6817C16.625 18.9751 16.4999 19.2564 16.2772 19.4639C16.0545 19.6713 15.7524 19.7878 15.4375 19.7878H3.5625C3.24756 19.7878 2.94551 19.6713 2.72281 19.4639C2.50011 19.2564 2.375 18.9751 2.375 18.6817V9.83308C2.375 9.53973 2.50011 9.25839 2.72281 9.05096C2.94551 8.84353 3.24756 8.727 3.5625 8.727H15.4375C15.7524 8.727 16.0545 8.84353 16.2772 9.05096C16.4999 9.25839 16.625 9.53973 16.625 9.83308V18.6817Z"
                          fill="#000"
                        />
                      </svg>
                    ) : null}
                    {game.gameData?.mvpId != '' && game.gameData?.mvpId != null
                      ? 'MVP was already chosen'
                      : 'Choose the MVP'}
                  </h5>
                  {allPlayers?.map((player) => {
                    return (
                      <div key={player.id}>
                        <button
                          onClick={() => changeMVPStat('add', player.id)}
                          className={
                            game.gameData?.mvpId == player.id
                              ? 'gamereplay__admincontrols--mvp-btn gamereplay__admincontrols--mvp-btn-active'
                              : 'gamereplay__admincontrols--mvp-btn'
                          }
                        >
                          {player.Name} #{player.Number}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {userData.role == 'admin' ? (
              <div className="gamereplay__admincontrols__danger">
                <h3 className="gamereplay__admincontrols__danger--title">
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
                  onClick={() => deleteGame()}
                  className="gamereplay__admincontrols__danger--btn"
                >
                  <svg
                    width="17"
                    height="20"
                    viewBox="0 0 17 20"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: '10px' }}
                  >
                    <path
                      d="M13.8884 2.39617H10.7752C10.6199 1.04952 9.47418 0 8.08654 0C6.69893 0 5.55336 1.04948 5.39806 2.39617H2.28473C1.02486 2.39617 0 3.42131 0 4.68114V4.79838C0 5.76114 0.599466 6.58518 1.44394 6.92094V17.715C1.44394 18.9749 2.46892 20 3.72871 20H12.4444C13.7043 20 14.7292 18.9748 14.7292 17.715V6.92098C15.5736 6.58518 16.1731 5.76114 16.1731 4.79843V4.68119C16.1731 3.42131 15.1482 2.39617 13.8884 2.39617ZM8.08654 1.08364C8.87575 1.08364 9.5345 1.64932 9.68026 2.39617H6.4931C6.63882 1.64928 7.29761 1.08364 8.08654 1.08364ZM13.6455 17.715C13.6455 18.3774 13.1066 18.9164 12.4444 18.9164H3.72867C3.06648 18.9164 2.52754 18.3774 2.52754 17.715V7.08336H13.6455V17.715ZM15.0895 4.79838C15.0895 5.46078 14.5505 5.99976 13.8883 5.99976H2.28473C1.62254 5.99976 1.0836 5.46078 1.0836 4.79838V4.68114C1.0836 4.01875 1.62254 3.47977 2.28473 3.47977H13.8884C14.5506 3.47977 15.0895 4.01875 15.0895 4.68114L15.0895 4.79838Z"
                      fill="#fff"
                    />
                    <path
                      d="M5.18165 17.5306C5.48089 17.5306 5.72345 17.2879 5.72345 16.9888V10.8883C5.72345 10.5891 5.48085 10.3464 5.18165 10.3464C4.88246 10.3464 4.63985 10.5891 4.63985 10.8883V16.9888C4.63981 17.288 4.88242 17.5306 5.18165 17.5306Z"
                      fill="#fff"
                    />
                    <path
                      d="M8.08654 17.5306C8.38577 17.5306 8.62838 17.2879 8.62838 16.9888V10.8883C8.62838 10.5891 8.38569 10.3464 8.08654 10.3464C7.78734 10.3464 7.54474 10.5891 7.54474 10.8883V16.9888C7.54474 17.288 7.7873 17.5306 8.08654 17.5306Z"
                      fill="#fff"
                    />
                    <path
                      d="M10.9914 17.5306C11.2906 17.5306 11.5332 17.2879 11.5332 16.9888V10.8883C11.5332 10.5891 11.2906 10.3464 10.9914 10.3464C10.6921 10.3464 10.4496 10.5891 10.4496 10.8883V16.9888C10.4495 17.288 10.6922 17.5306 10.9914 17.5306Z"
                      fill="#fff"
                    />
                  </svg>
                  Delete Game
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
