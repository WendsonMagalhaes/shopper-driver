import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RideRequest from './pages/RideRequest/RideRequest';
import RideOptions from './pages/RideOptions/RideOptions';
import RideHistory from './pages/RideHistory/RideHistory';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RideRequest />} />
        <Route path="/ride-options" element={<RideOptions />} />
        <Route path="/ride-history" element={<RideHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
