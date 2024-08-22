import React from "react";
import withNavigation from "../../../hoc/withNavigation";
import Title from "../title/Title";

const gameInfo: React.FC<{
  hometeam: string;
  guestteam: string;
  onChange: (data: unknown) => void;
}> = ({ hometeam, guestteam, onChange }) => {
  return (
    <>
      <Title titleName="Create a new game" back={true} subtitle="" />
      <div className="wizard section">
        <div className="wizard__input__wrapper">
          <div className="wizard__input__field">
            <input
              id="hometeam"
              className="wizard__input"
              type="text"
              placeholder=" "
              value={hometeam}
              onChange={(e) => onChange({ hometeam: e.target.value })}
            />
            <label className="wizard__label" htmlFor="hometeam">
              Home Team
            </label>
          </div>
          <p className="wizard__vs">vs.</p>
          <div className="wizard__input__field">
            <input
              id="guestteam"
              className="wizard__input"
              type="text"
              placeholder=" "
              value={guestteam}
              onChange={(e) => onChange({ guestteam: e.target.value })}
            />
            <label className="wizard__label" htmlFor="guestteam">
              Guest Team
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default withNavigation(gameInfo);
