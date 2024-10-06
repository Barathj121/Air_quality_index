import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';
import { AlertCircle, Activity, Droplet } from 'lucide-react';
import './App.css';
import CustomGauge from './GaugeComponent';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Coimbatore, Tamilnadu');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      throw new Error('API not implemented');
    } catch (error) {
      console.error('Error fetching data:', error);
      setData({
        PM25: 27,
        PM10: 35,
        NO2: 2,
        SO2: 31,
        CO: 0.48,
        Ozone: 3,
        Temperature: 24,
        Pressure: 961,
        Humidity: 72,
        WindSpeed: 1.5,
        WindDirection: 45,
        SolarRadiation: 172,
        AQI: 45,
      });
      setLastUpdated(new Date().toLocaleString());
    }
  };

  if (!data) return <div>Loading...</div>;

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Dashboard</h1>
        <div className="location">
            <img src="/src/assets/icons/gps_1.png" alt="Location Icon" style={{ width: '16px', height: '16px', marginRight: '5px' }} />
            {location}
        </div>      
      </div>
      <p className="last-updated">Last updated: {lastUpdated}</p>

      <div className="grid grid-cols-6">
        {['PM2.5', 'PM10', 'NO2', 'SO2', 'CO', 'Ozone'].map((metric, index) => (
          <div key={index} className="card metric-card">
            <div className="metric-content">
              <h3 className="metric-title">{metric}</h3>
              <p className="metric-value">{data[metric]} <span className="metric-unit">µg/m³</span></p>
            </div>
            <img src={`/assets/icons/${metric.toLowerCase()}.png`} alt={metric} className="metric-icon" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-6">
        {['Temperature', 'Pressure', 'Humidity', 'Wind Speed', 'Wind Direction', 'Solar Radiation'].map((metric, index) => (
          <div key={index} className="card metric-card">
            <div className="metric-content">
              <h3 className="metric-title">{metric}</h3>
              <p className="metric-value">
                {data[metric]}
                <span className="metric-unit">
                  {metric === 'Pressure' ? 'Pa' : metric === 'Wind Speed' ? 'm/s' : metric === 'Wind Direction' ? '°' : 'W/m²'}
                </span>
              </p>
            </div>
            <img src={`src/assets/icons/${metric.toLowerCase().replace(' ', '-')}.png`} alt={metric} className="metric-icon" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2">
        <div className="card col-span-1 aqi-card">
          <div className="aqi-content">
            <CustomGauge value={data.AQI} />
            <div className="aqi-info">
              <h2 className="metric-title">Air Quality Index</h2>
              <p className="aqi-value">{data.AQI}</p>
              <p className="aqi-level">{getAQILevel(data.AQI)}</p>
              <p className="aqi-cause">Caused by PM2.5</p>
            </div>
          </div>
        </div>

        <div className="recommendations-container col-span-1">
          <div className="card">
            <h3 className="recommendation-title">
              <AlertCircle /> Recommendations
            </h3>
            <p>Air quality is good, indicating a favorable environment for outdoor activities and exercise.</p>
          </div>

          <div className="card">
            <h3 className="recommendation-title">
              <Activity /> Health Advice
            </h3>
            <p>Encourage individuals to enjoy outdoor activities and maintain a healthy lifestyle.</p>
          </div>

          <div className="card">
            <h3 className="recommendation-title">
              <Droplet /> Travel Suggestions
            </h3>
            <p>Encourage individuals to enjoy outdoor activities and maintain a healthy lifestyle.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;