import { useNavigate } from 'react-router-dom';
import { useGame } from '../../../hooks/useGame';

const GameTimeout = () => {
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

  const performanceRatingAttack = () => {
    const attackRating = allPlayers?.map((player) => {
      const attack = player.attack;
      const attackRating =
        attack.hits * 0 + attack.kill * 1 + attack.error * -1;
      return attackRating;
    });
    // add every rating into one value
    const totalAttackRating = attackRating?.reduce(
      (acc, rating) => acc + rating,
      0
    );
    if (totalAttackRating === 0) {
      return ['Attacks are neutral', '--notice'];
    } else if (totalAttackRating > 0) {
      return ['Attacks are good, keep it up', ''];
    } else {
      return ['Attacks are bad, need to improve', '--error'];
    }
  };

  const performanceRatingBlock = () => {
    const blockRating = allPlayers?.map((player) => {
      const block = player.block;
      const blockRating = block.kill * 1 + block.error * -1;
      return blockRating;
    });
    // add every rating into one value
    const totalBlockRating = blockRating?.reduce(
      (acc, rating) => acc + rating,
      0
    );
    if (totalBlockRating === 0) {
      return ['Blocks are neutral', '--notice'];
    } else if (totalBlockRating > 0) {
      return ['Blocks are good, keep it up!', ''];
    } else {
      return ['Too many block-errors, reduce!', '--error'];
    }
  };

  const performanceRatingService = () => {
    const serviceRating = allPlayers?.map((player) => {
      const service = player.service;
      const serviceRating = service.ace * 1 + service.error * -1;
      return serviceRating;
    });
    // add every rating into one value
    const totalServiceRating = serviceRating?.reduce(
      (acc, rating) => acc + rating,
      0
    );
    if (totalServiceRating === 0) {
      return ['Service are neutral', '--notice'];
    } else if (totalServiceRating > 0) {
      return ['Service are good, keep it up!', ''];
    } else {
      return ['Too many service-errors, reduce!', '--error'];
    }
  };

  const performanceRatingReceive = () => {
    const receiveRating = allPlayers?.map((player) => {
      const receive = player.receive;
      const receiveRating =
        receive.positive * +2 + receive.negative * -1 + receive.error * -2;
      return receiveRating;
    });
    // add every rating into one value
    const totalReceiveRating = receiveRating?.reduce(
      (acc, rating) => acc + rating,
      0
    );
    if (totalReceiveRating === 0) {
      return ['Receives are neutral', '--notice'];
    } else if (totalReceiveRating > 0) {
      return ['Receives are good, keep it up!', ''];
    } else {
      return ['Too many receives-errors, reduce!', '--error'];
    }
  };

  const performanceRatingTips: { [key: string]: string[] }[] = [
    {
      Attack: performanceRatingAttack(),
    },
    {
      Block: performanceRatingBlock(),
    },
    {
      Service: performanceRatingService(),
    },
    {
      Receive: performanceRatingReceive(),
    },
  ];

  return (
    <>
      {gameTitle ? (
        <div>
          <div className="section">
            <div className="title">
              <div className="title__title">
                <div className="back c-pointer">
                  <a onClick={() => navigate(-1)}>
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
              <p className="title__subtitle">{date}</p>
            </div>
          </div>
          <div className="section">
            <div className="gametimeout__tips__wrapper">
              {performanceRatingTips.map(
                (tip: { [key: string]: string[] }, index) => (
                  <div
                    key={index}
                    className={`gametimeout__tips itemlist__link${
                      tip[Object.keys(tip)[0]][1]
                    }`}
                  >
                    {/* display tip.key and tip.value */}
                    {Object.entries(tip).map(([key, value]) => (
                      <p style={{ marginBottom: '0' }} key={key}>
                        <b>{key}</b>: {value[0]}
                      </p>
                    ))}
                  </div>
                )
              )}
            </div>
            <table className="simpletable tablehightlight">
              <tbody>
                <tr className="simpletable__title">
                  <th className="gametimeout__title simpletable__title__field">
                    Player
                  </th>
                  <th className="gametable__title__field simpletable__title__field">
                    Attack
                    <div className="gametimeout__title__field--wrapper">
                      <span>Hits</span>
                      <span>Kills</span>
                      <span>Error</span>
                      <span>Kill%</span>
                      <span>Effi.</span>
                    </div>
                  </th>
                  <th className="gametable__title__field simpletable__title__field">
                    Block
                    <div className="gametimeout__title__field--wrapper">
                      <span>Kill</span>
                      <span>Error</span>
                    </div>
                  </th>
                  <th className="gametable__title__field simpletable__title__field">
                    Service
                    <div className="gametimeout__title__field--wrapper">
                      <span>Ace</span>
                      <span>Error</span>
                    </div>
                  </th>
                  <th className="gametable__title__field simpletable__title__field">
                    Receive
                    <div className="gametimeout__title__field--wrapper">
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
                      <td className="gametimeout__row__field">
                        <div className="gametimeout__row__field--wrapper">
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
                      <td className="gametimeout__row__field">
                        <div className="gametimeout__row__field--wrapper">
                          <span>{player.block.kill}</span>
                          <span>{player.block.error}</span>
                        </div>
                      </td>
                      <td className="gametimeout__row__field">
                        <div className="gametimeout__row__field--wrapper">
                          <span>{player.service.ace}</span>
                          <span>{player.service.error}</span>
                        </div>
                      </td>
                      <td className="gametimeout__row__field">
                        <div className="gametimeout__row__field--wrapper">
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

export default GameTimeout;
