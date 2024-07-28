import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import CityDisplay from './components/CityDisplay';
import AirQualityMeter from './components/AirQualityMeter';
import TopNavbar from './components/TopNavbar';
import LastUpdated from './components/LastUpdated';
import Location from './components/Location';

const airQualityData = [
  { type: 'PM2.5', value: 50 },
  { type: 'PM10', value: 30 },
  { type: 'NO2', value: 40 },
  { type: 'SO2', value: 20 },
  { type: 'CO', value: 60 },
  { type: 'Ozone', value: 70 },
  { type: 'Temperature', value: 25 },
  { type: 'Wind Speed', value: 10 },
  { type: 'Humidity', value: 80 },
  { type: 'Pressure', value: 90 }
];

function App() {
  const overallAirQuality = airQualityData.reduce((sum, data) => sum + data.value, 0) / airQualityData.length;

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <div className="top-navbar">
          <LastUpdated />
          <Location city="Coimbatore, Tamil Nadu" />
        </div>
        <h1>Air Quality Dashboard</h1>
        <div className="dashboard-container">
          <CityDisplay city="Coimbatore, Tamil Nadu" overallAirQuality={overallAirQuality} />
          <div className="additional-info">
            <div>Recommendations</div>
            <div>Health Advice</div>
            <div>Travel Suggestion</div>
          </div>
        </div>
        <div className="meters-container">
          {airQualityData.map((data, index) => (
            <AirQualityMeter key={index} type={data.type} value={data.value} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
