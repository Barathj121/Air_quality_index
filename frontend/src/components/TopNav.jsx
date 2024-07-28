import React from 'react';
import './TopNav.css';

const TopNav = () => {
  return (
    <div className="top-nav">
      <div className="last-updated">
        <span>Last updated</span>
        <i className="fas fa-sync-alt"></i>
      </div>
      <div className="location">
        <i className="fas fa-map-marker-alt"></i>
        <span>Coimbatore, Tamil Nadu</span>
      </div>
    </div>
  );
};

export default TopNav;
