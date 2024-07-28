import React, { useEffect, useState } from 'react';
import AirQualityMeter from './components/AirQualityMeter';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import './App.css';

const App = () => {
  const [data, setData] = useState({
    PM25: 50,
    PM10: 30,
    NO2: 40,
    SO2: 20,
    CO: 60,
    Ozone: 50,
    Temperature: 30,
    WindSpeed: 40,
    Humidity: 50,
    WindDirection: 60,
    SolarRadiation: 70,
    Pressure: 80,
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        PM25: Math.random() * 500,
        PM10: Math.random() * 500,
        NO2: Math.random() * 500,
        SO2: Math.random() * 500,
        CO: Math.random() * 500,
        Ozone: Math.random() * 500,
        Temperature: Math.random() * 500,
        WindSpeed: Math.random() * 500,
        Humidity: Math.random() * 500,
        WindDirection: Math.random() * 500,
        SolarRadiation: Math.random() * 500,
        Pressure: Math.random() * 500,
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <SideNav />
      <main className="main-content">
        <TopNav />
        <div className="overview">
          <AirQualityMeter type="Overall AQI" value={data.PM25} /> {/* Adjusted for example */}
          <div className="suggestions">
            <div className="suggestion">Recommendations</div>
            <div className="suggestion">Health Advice</div>
            <div className="suggestion">Travel Suggestion</div>
          </div>
        </div>
        <section className="details-grid">
          {Object.keys(data).map((key) => (
            <AirQualityMeter key={key} type={key} value={data[key]} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default App;
