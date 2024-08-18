import React from 'react';
import withNavigation from '../../../hoc/withNavigation';

const gameInfo: React.FC<{ hometeam: string; guestteam: string; onChange: (data: any) => void }> = ({ hometeam, guestteam, onChange }) => {
  return (
    <div>
      <h2>Select Teams</h2>
      <input
        type="text"
        placeholder="Home Team"
        value={hometeam}
        onChange={(e) => onChange({ hometeam: e.target.value })}
      />
      <input
        type="text"
        placeholder="Guest Team"
        value={guestteam}
        onChange={(e) => onChange({ guestteam: e.target.value })}
      />
    </div>
  );
};

export default withNavigation(gameInfo);