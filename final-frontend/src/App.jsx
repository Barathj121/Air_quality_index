  import React, { useState, useEffect } from 'react';
  import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';
  import { AlertCircle, Activity, Droplet } from 'lucide-react';
  import './App.css';
  import CustomGauge from './GaugeComponent'; // Import the CustomGauge component

  const App = () => {
    const [data, setData] = useState(null);
    const [location, setLocation] = useState('Coimbatore, Tamilnadu');
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('https://api.example.com/air-quality');
        // const result = await response.json();
        // setData(result);
        throw new Error('API not implemented');
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to dummy data
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

    const getAQIColor = (aqi) => {
      if (aqi <= 50) return 'bg-green-500';
      if (aqi <= 100) return 'bg-yellow-500';
      if (aqi <= 150) return 'bg-orange-500';
      if (aqi <= 200) return 'bg-red-500';
      if (aqi <= 300) return 'bg-purple-500';
      return 'bg-maroon-500';
    };

    const getAQILevel = (aqi) => {
      if (aqi <= 50) return 'Good';
      if (aqi <= 100) return 'Moderate';
      if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
      if (aqi <= 200) return 'Unhealthy';
      if (aqi <= 300) return 'Very Unhealthy';
      return 'Hazardous';
    };

    const chartData = [
      { name: 'Mon', value: 30 },
      { name: 'Tue', value: 40 },
      { name: 'Wed', value: 35 },
      { name: 'Thu', value: 50 },
      { name: 'Fri', value: 45 },
      { name: 'Sat', value: 40 },
      { name: 'Sun', value: 30 },
    ];

    return (
      <div className="container">
        <div className="header">
          <h1 className="title">Dashboard</h1>
          <div className="location">📍 {location}</div>
        </div>
        <p className="last-updated">Last updated: {lastUpdated}</p>

        <div className="grid grid-cols-6">
          {['PM2.5', 'PM10', 'NO2', 'SO2', 'CO', 'Ozone'].map((metric, index) => (
            <div key={index} className="card">
              <h3 className="metric-title">{metric}</h3>
              <p className="metric-value">{data[metric]} <span className="metric-unit">µg/m³</span></p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-6">
          {['Temperature', 'Pressure', 'Humidity', 'Wind Speed', 'Wind Direction', 'Solar Radiation'].map((metric, index) => (
            <div key={index} className="card">
              <h3 className="metric-title">{metric}</h3>
              <p className="metric-value">{data[metric]} <span className="metric-unit">{metric === 'Pressure' ? 'Pa' : metric === 'Wind Speed' ? 'm/s' : metric === 'Wind Direction' ? '°' : 'W/m²'}</span></p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2">
          <div className="card col-span-1">
            <div>
              <h2 className="metric-title">Air Quality Index</h2>
              <CustomGauge value={data.AQI} /> {/* Use the CustomGauge component here */}
              <p className="aqi-value">{data.AQI}</p>
              <p className="aqi-level">{getAQILevel(data.AQI)}</p>
              <p className="aqi-cause">Caused by PM2.5</p>
            </div>
          </div>

          {/* New recommendations container */}
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