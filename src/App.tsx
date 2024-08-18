import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './ui/pages/Landing';
import Table from './ui/pages/Table';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </Router>
  );
};

export default App;
