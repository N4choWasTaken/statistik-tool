import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./ui/pages/Landing";
import Table from "./ui/pages/Table";
import GameActive from "./ui/pages/GameActive";
import GameReplay from "./ui/pages/GameReplay";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/table" element={<Table />} />
        <Route path="/game-active" element={<GameActive />} />
        <Route path="/game-replay" element={<GameReplay />} />
      </Routes>
    </Router>
  );
};

export default App;
