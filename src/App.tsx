import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./ui/pages/Landing";
import Table from "./ui/pages/Table";
import GameActive from "./ui/pages/GameActive";
import GameReplay from "./ui/pages/GameReplay";
import Wizard from "./ui/pages/Wizard";
import PlayerOverview from "./ui/pages/PlayerOverview";
import SaisonOverview from "./ui/pages/SaisonOverview";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/table" element={<Table />} />
        <Route path="/game-active" element={<GameActive />} />
        <Route path="/game-replay" element={<GameReplay />} />
        <Route path="/wizard" element={<Wizard />} />
        <Route path="/overview-players" element={<PlayerOverview />} />
        <Route path="/overview-saison" element={<SaisonOverview />} />
      </Routes>
    </Router>
  );
};

export default App;
