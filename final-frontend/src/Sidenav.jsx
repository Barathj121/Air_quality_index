import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidenav.css';

const SideNav = () => {
  return (
    <nav className="sidenav">
      <ul>
        <li><NavLink to="/" end>Dashboard</NavLink></li>
        <li><NavLink to="/advanced-analysis">AQI Forecast</NavLink></li>
        <li><NavLink to="/map">Map</NavLink></li>
      </ul>
    </nav>
  );
};

export default SideNav;