import React from 'react';
import './SideNav.css';

const SideNav = () => {
  return (
    <nav className="side-nav">
      <ul>
        <li><a href="/"><i className="fas fa-home"></i> Dashboard</a></li>
        <li><a href="/aqi-map"><i className="fas fa-map"></i> AQI - Map</a></li>
        <li><a href="/data-tables"><i className="fas fa-table"></i> Data Tables</a></li>
        <li><a href="/air-quality-forecasts"><i className="fas fa-broadcast-tower"></i> Air Quality Forecasts</a></li>
        <li><a href="/calendar-history"><i className="fas fa-calendar"></i> Calendar History</a></li>
      </ul>
    </nav>
  );
};

export default SideNav;
