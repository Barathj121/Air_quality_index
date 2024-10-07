// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard'; // Import the Dashboard component
import AdvancedAnalysis from './AdvancedAnalysis'; // Import the Advanced Analysis component
import './app.css';
import SideNav from './Sidenav'; // Adjust the path as necessary

const App = () => {
  return (
    <Router>
      <div className="container">
        <SideNav /> {/* Add the SideNav here */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* Dashboard route */}
            <Route path="/advanced-analysis" element={<AdvancedAnalysis />} /> {/* Advanced Analysis route */}
            {/* Define more routes here as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
