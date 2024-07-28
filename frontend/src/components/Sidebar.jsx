import React from 'react';
import { FiHome, FiMap, FiTable, FiCalendar, FiCloud } from 'react-icons/fi';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><FiHome /> Dashboard</li>
        <li><FiMap /> AQI Map</li>
        <li><FiTable /> Data Tables</li>
        <li><FiCloud /> Air Quality Forecast</li>
        <li><FiCalendar /> Calendar History</li>
      </ul>
    </div>
  );
}

export default Sidebar;
