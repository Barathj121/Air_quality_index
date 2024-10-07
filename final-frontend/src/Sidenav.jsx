import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideNav.css';

const SideNav = () => {
  const location = useLocation();
  
  return (
    <nav className="sidenav">
      <ul>
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link></li>
        <li><Link to="/advanced-analysis" className={location.pathname === '/advanced-analysis' ? 'active' : ''}>Advanced Analysis</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default SideNav;
