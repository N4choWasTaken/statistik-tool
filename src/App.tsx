import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./ui/pages/Landing";
import Table from "./ui/pages/Table";
import Game from "./ui/pages/Game";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/table" element={<Table />} />
        <Route path="/game-active" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
