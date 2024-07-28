import React from 'react';
import { FaTachometerAlt, FaMap, FaTable, FaCloudSun, FaCalendarAlt } from 'react-icons/fa';
import './Sidebar.css'; // Ensure you have a Sidebar.css file in the same directory

function Sidebar() {
  return (
	<div className="sidebar">
	  <h3><FaTachometerAlt /> Dashboard</h3>
	  <h3><FaMap /> AQI Map</h3>
	  <h3><FaTable /> Data Tables</h3>
	  <h3><FaCloudSun /> Air Quality Forecast</h3>
	  <h3><FaCalendarAlt /> Calendar History</h3>
	</div>
  );
}

export default Sidebar;