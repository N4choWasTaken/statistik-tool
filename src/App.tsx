import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import usePlayers from './hooks/usePlayers';
import Landing from './ui/pages/Landing';
import Table from './ui/pages/Table';
import GameActive from './ui/pages/GameActive';
import GameReplay from './ui/pages/GameReplay';
import Wizard from './ui/pages/Wizard';
import PlayerOverview from './ui/pages/PlayerOverview';
import SaisonOverview from './ui/pages/SaisonOverview';
import PlayerDetail from './ui/pages/PlayerDetail';
import SaisonDetail from './ui/pages/SaisonDetail';
import GameTimeout from './ui/components/gametimeout/GameTimeout';

const App: React.FC = () => {
  const { players } = usePlayers();

  const allPlayerRoutes = players.map((player) => ({
    key: String(player.id),
    name: `${player.Name} #${player.Number}`,
    href: `/player/${player.id}`,
  }));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/table" element={<Table />} />
        <Route path="/game-active" element={<GameActive />} />
        <Route path="/game-replay" element={<GameReplay />} />
        <Route path="/game-timeout" element={<GameTimeout />} />
        <Route path="/wizard" element={<Wizard />} />
        <Route path="/player" element={<PlayerOverview />} />
        <Route path="/overview-season" element={<SaisonOverview />} />
        <Route path="/season-detail/Season-24-25" element={<SaisonDetail />} />
        {allPlayerRoutes.map((player) => (
          <Route
            key={player.key}
            path={player.href}
            element={<PlayerDetail playerId={player.key} />}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
