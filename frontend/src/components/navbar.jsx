import React from 'react';
import './Sidebar.css'; // Ensure you have a Sidebar.css file in the same directory

function Sidebar() {
  return (
    <div className="sidebar">
        <h3>Dashboard</h3>
        <h3>AQI Map </h3>
        <h3>Data Tables</h3>
        <h3>Air Quality Forecast</h3>
        <h3>Calendar History</h3>
    </div>
  );
}

export default Sidebar;