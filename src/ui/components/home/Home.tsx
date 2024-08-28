import { useGame } from "../../../hooks/useGame";
import { useSeason } from "../../../hooks/useSeason";
import Header from "../header/Header";

const Home = () => {
  const seasonData = useSeason("Season-24-25");
  const seasonGamesData = useGame(
    seasonData?.gameData[seasonData.gameData.length - 1]?.gameId?.toString()
  );

  return (
    <>
      <Header />
      <div className="home section">
        <div className="home__header">
          <h3 className="home__header__title">
            HU23 - VBC Limmattal - Statistics
          </h3>
        </div>
        <h4>Create</h4>
        <div className="home__link__wrapper">
          <a className="home__link" href="/wizard">
            <svg
              style={{ marginRight: "10px" }}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="home__link__creategameIcon"
            >
              <path
                d="M16.9991 12.6343H6.93804M11.9301 7.79586V17.4727M17 9.5V3C17 1.5 16.0001 1 14.5 1H3.50003C1.99999 1 1.00003 2 1.00003 3V14.5C1.00003 16 1.99999 17 3.50003 17H8.00003"
                stroke="black"
                strokeWidth="1.44"
              />
            </svg>
            New Game
          </a>
        </div>
        <h4>Overviews</h4>
        <div className="home__link__wrapper">
          <a className="home__link" href="/overview-season">
            <svg
              style={{ marginRight: "10px" }}
              width="19"
              height="21"
              viewBox="0 0 19 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.00599 0H4.49977C4.43518 0 4.37392 0.0135728 4.31457 0.0328586C4.01805 0.129024 3.79887 0.44559 3.79887 0.82533V2.52979C3.79887 2.61601 3.81324 2.69748 3.83408 2.77548C3.92331 3.11054 4.18588 3.35512 4.49977 3.35512H5.00599C5.39316 3.35512 5.70689 2.98565 5.70689 2.52979V0.82533C5.70689 0.36947 5.39316 0 5.00599 0Z"
                fill="black"
              />
              <path
                d="M14.97 0H14.4637C14.0766 0 13.7628 0.36947 13.7628 0.82533V2.52979C13.7628 2.98565 14.0766 3.35512 14.4637 3.35512H14.97C15.3571 3.35512 15.6709 2.98565 15.6709 2.52979V0.82533C15.6707 0.36947 15.357 0 14.97 0Z"
                fill="black"
              />
              <path
                d="M17.5556 2.06574H16.3023V2.52979C16.3023 3.33315 15.7045 3.9867 14.9698 3.9867H14.4636C13.7289 3.9867 13.1311 3.33315 13.1311 2.52979V2.06574H6.33847V2.52979C6.33847 3.33315 5.74067 3.9867 5.00599 3.9867H4.49977C3.76506 3.9867 3.16729 3.33315 3.16729 2.52979V2.06574H2.07516C1.37949 2.06574 0.815308 2.59468 0.815308 3.2468V18.9766C0.815308 19.63 1.37945 20.1577 2.07516 20.1577H17.5555C18.2518 20.1577 18.8153 19.6298 18.8153 18.9766V3.24696C18.8155 2.59484 18.252 2.06574 17.5556 2.06574ZM17.165 18.424L2.41983 18.4183V5.73679H17.165V18.424Z"
                fill="black"
              />
              <path
                d="M11.3944 8.79284H15.2724C15.609 8.79284 15.8812 8.45669 15.8812 8.04125C15.8812 7.62582 15.6088 7.28967 15.2724 7.28967H11.3944C11.0578 7.28967 10.7856 7.62582 10.7856 8.04125C10.7856 8.45653 11.0578 8.79284 11.3944 8.79284Z"
                fill="black"
              />
              <path
                d="M11.3944 11.5077H15.2724C15.609 11.5077 15.8812 11.1715 15.8812 10.7561C15.8812 10.3407 15.6088 10.0046 15.2724 10.0046H11.3944C11.0578 10.0046 10.7856 10.3407 10.7856 10.7561C10.7856 11.1715 11.0578 11.5077 11.3944 11.5077Z"
                fill="black"
              />
              <path
                d="M11.3944 14.2225H15.2724C15.609 14.2225 15.8812 13.8864 15.8812 13.471C15.8812 13.0555 15.6088 12.7194 15.2724 12.7194H11.3944C11.0578 12.7194 10.7856 13.0555 10.7856 13.471C10.7856 13.8864 11.0578 14.2225 11.3944 14.2225Z"
                fill="black"
              />
              <path
                d="M11.3944 16.9376H15.2724C15.609 16.9376 15.8812 16.6014 15.8812 16.186C15.8812 15.7705 15.6088 15.4344 15.2724 15.4344H11.3944C11.0578 15.4344 10.7856 15.7705 10.7856 16.186C10.7856 16.6014 11.0578 16.9376 11.3944 16.9376Z"
                fill="black"
              />
              <path
                d="M4.52599 8.79284H8.4039C8.74052 8.79284 9.01273 8.45669 9.01273 8.04125C9.01273 7.62582 8.74035 7.28967 8.4039 7.28967H4.52599C4.18935 7.28967 3.91713 7.62582 3.91713 8.04125C3.91716 8.45653 4.18935 8.79284 4.52599 8.79284Z"
                fill="black"
              />
              <path
                d="M4.52599 11.5077H8.4039C8.74052 11.5077 9.01273 11.1715 9.01273 10.7561C9.01273 10.3407 8.74035 10.0046 8.4039 10.0046H4.52599C4.18935 10.0046 3.91713 10.3407 3.91713 10.7561C3.91716 11.1715 4.18935 11.5077 4.52599 11.5077Z"
                fill="black"
              />
              <path
                d="M4.52599 14.2225H8.4039C8.74052 14.2225 9.01273 13.8864 9.01273 13.471C9.01273 13.0555 8.74035 12.7194 8.4039 12.7194H4.52599C4.18935 12.7194 3.91713 13.0555 3.91713 13.471C3.91713 13.8864 4.18935 14.2225 4.52599 14.2225Z"
                fill="black"
              />
              <path
                d="M4.52599 16.9376H8.4039C8.74052 16.9376 9.01273 16.6014 9.01273 16.186C9.01273 15.7705 8.74035 15.4344 8.4039 15.4344H4.52599C4.18935 15.4344 3.91713 15.7705 3.91713 16.186C3.91716 16.6014 4.18935 16.9376 4.52599 16.9376Z"
                fill="black"
              />
            </svg>
            Season
          </a>
          <a className="home__link" href="/player">
            <svg
              style={{ marginRight: "10px" }}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 8.74973C10.094 8.74973 11.1432 8.31514 11.9167 7.54158C12.6903 6.76802 13.1249 5.71885 13.1249 4.62486C13.1249 3.53088 12.6903 2.48171 11.9167 1.70814C11.1432 0.934583 10.094 0.5 9 0.5C7.90602 0.5 6.85684 0.934583 6.08328 1.70814C5.30972 2.48171 4.87514 3.53088 4.87514 4.62486C4.87514 5.71885 5.30972 6.76802 6.08328 7.54158C6.85684 8.31514 7.90602 8.74973 9 8.74973ZM9 10.562C3.51573 10.562 0 13.5885 0 15.062V17.8135H18V15.062C18 13.28 14.6716 10.562 9 10.562Z"
                fill="black"
              />
            </svg>
            Player
          </a>
        </div>
        {seasonGamesData.gameData && (
          <div>
            <h4>Latest Game</h4>
            <div className="itemlist__seasondetail__link__wrapper">
              <a
                key={seasonGamesData.gameData?.id}
                className="itemlist__seasondetail__link"
                href={
                  seasonGamesData.gameData?.gameFinished
                    ? `/game-replay?gameid=${seasonGamesData.gameData?.id}`
                    : `/game-active?gameid=${seasonGamesData.gameData?.id}`
                }
              >
                <div className="itemlist__seasondetail__link__text">
                  <span className="itemlist__seasondetail__link__date">
                    {seasonGamesData.gameData?.date
                      .toDate()
                      .toUTCString()
                      .toString()
                      .slice(4, 16)}
                  </span>
                  {`${seasonGamesData.gameData?.homeTeam} vs ${seasonGamesData.gameData?.guestTeam}`}
                </div>
                {seasonGamesData.gameData?.gameFinished ? (
                  <svg
                    style={{ marginLeft: "10px" }}
                    width="23"
                    height="12"
                    viewBox="0 0 23 12"
                    fill="none"
                    xmlns="http:www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.25004H0.25V6.75004H1V5.25004ZM22.5303 6.53037C22.8232 6.23748 22.8232 5.7626 22.5303 5.46971L17.7574 0.696739C17.4645 0.403839 16.9896 0.403839 16.6967 0.696739C16.4038 0.989639 16.4038 1.46454 16.6967 1.75744L20.9393 6.00004L16.6967 10.2427C16.4038 10.5356 16.4038 11.0104 16.6967 11.3033C16.9896 11.5962 17.4645 11.5962 17.7574 11.3033L22.5303 6.53037ZM1 6.75004L22 6.75004V5.25004L1 5.25004V6.75004Z"
                      fill="black"
                    />
                  </svg>
                ) : (
                  <svg
                    style={{ marginLeft: "10px" }}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http:www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5851 17.9696H0.643397C0.288199 17.9696 0 17.6816 0 17.326V3.38424C0 3.02884 0.288199 2.74084 0.643397 2.74084H7.61417C7.96957 2.74084 8.25757 3.02904 8.25757 3.38424C8.25757 3.73943 7.96937 4.02763 7.61417 4.02763H1.28699V16.6826H13.9417V10.355C13.9417 9.99961 14.2299 9.71161 14.5851 9.71161C14.9405 9.71161 15.2285 9.99981 15.2285 10.355V17.326C15.2287 17.6816 14.9405 17.9696 14.5851 17.9696Z"
                      fill="black"
                    />
                    <path
                      d="M17.8117 2.19164L15.8063 0.188249C15.5553 -0.0627497 15.1479 -0.0627497 14.8969 0.188249L6.07917 9.00801C6.02117 9.06601 5.97417 9.13461 5.94198 9.20961L4.44278 12.7122C4.33758 12.9546 4.39338 13.2356 4.57798 13.42C4.70238 13.5444 4.86538 13.6088 5.03278 13.6088C5.11858 13.6088 5.20438 13.5916 5.28798 13.5574L8.79056 12.0582C8.86556 12.026 8.93436 11.9788 8.99216 11.921L17.8119 3.10344C18.0627 2.85004 18.0627 2.44264 17.8117 2.19164ZM6.25717 11.7428L6.84277 10.3786L7.62137 11.1572L6.25717 11.7428ZM8.38496 10.709L7.29117 9.61521L13.6013 3.30484L14.6953 4.39863L8.38496 10.709ZM15.3021 3.79163L14.2083 2.69784L15.3515 1.55464L16.4453 2.64644L15.3021 3.79163Z"
                      fill="black"
                    />
                  </svg>
                )}
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
