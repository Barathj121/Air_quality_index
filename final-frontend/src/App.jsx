import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AdvancedAnalysis from './AdvancedAnalysis';
import './app.css';
import SideNav from './Sidenav';
import MapComponent from './MapComponent';

const App = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aqiStations, setAqiStations] = useState([]); // Initialize with empty array or fetch data

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Router>
      <div className="container">
        <SideNav />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/advanced-analysis" element={<AdvancedAnalysis />} />
            <Route 
              path="/map" 
              element={
                <MapComponent 
                  aqiStations={aqiStations}
                  isFullscreen={isFullscreen}
                  toggleFullscreen={toggleFullscreen}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;