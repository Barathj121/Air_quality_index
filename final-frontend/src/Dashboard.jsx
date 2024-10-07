import React, { useState, useEffect } from 'react';
import { AlertCircle, Activity, Droplet } from 'lucide-react';
import CustomGauge from './GaugeComponent';
import aqiData from './assets/recommendations.json'; // Importing the JSON file
import './App.css';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [aqiRecommendation, setAqiRecommendation] = useState(null);
  const [location, setLocation] = useState('Coimbatore, Tamilnadu');
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3030/api/aqi/latest");
      if (!response.ok) throw new Error("API not responding");
      const json = await response.json();

      // Extract and set the API data
      const apiData = {
        PM25: json.data['PM2.5'],
        PM10: json.data['PM10'],
        NO2: json.data['NO2'],
        SO2: json.data['SO2'],
        CO: json.data['CO'],
        Ozone: json.data['Ozone'],
        Temperature: json.data['Temperature'],
        Pressure: json.data['Pressure'],
        Humidity: json.data['Humidity'],
        WindSpeed: json.data['WS'],
        WindDirection: json.data['WD'],
        SolarRadiation: json.data['SR'],
        AQI: json.data['AQI'],
      };

      setData(apiData);
      setAqiRecommendation(getAQIRecommendation(apiData.AQI));
      setLastUpdated(new Date().toLocaleString());

    } catch (error) {
      console.error('Error fetching data:', error);
      // Set dummy data if the API call fails
      const dummyData = {
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
      };
      setData(dummyData);
      setAqiRecommendation(getAQIRecommendation(dummyData.AQI));
      setLastUpdated(new Date().toLocaleString());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getAQIRecommendation = (aqi) => {
    // Check if aqiData is an array
    if (Array.isArray(aqiData)) {
      return aqiData.find(item => aqi >= item.range[0] && aqi <= item.range[1]) || null;
    } else {
      console.error("aqiData is not an array");
      return null; // Handle error case
    }
  };

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  if (!data || !aqiRecommendation) return <div>Loading...</div>; // Display loading or message if data is not available

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
            <img src={`src/assets/icons/${metric.toLowerCase().replace(' ', '-')}.png`} alt={metric} className="metric-icon" />
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
          <h1 className="metric-title center-text-metergauge">Air Quality Index</h1>
          <div className="aqi-content">
            <CustomGauge value={data.AQI} />
          </div>
          <div className="aqi-info">
            <p className="aqi-level">Overall Air Quality: {getAQILevel(data.AQI)}</p>
            <p className="aqi-cause">Primary Cause: PM2.5</p>
            <img src={aqiRecommendation.maskImage} alt="Mask Recommendation" className='metric-icon2' />

            <p>Windows: {aqiRecommendation.windowsOpen}</p>
            <p>Air Purifier: {aqiRecommendation.purifierRequired}</p>
            {/* <img src={aqiRecommendation.sensitiveGroupsImage} alt="Sensitive Group Mask Image" className="recommendation-icon" /> */}
          </div>
        </div>

        <div className="recommendations-container col-span-1">
          <div className="card">
            <h3 className="recommendation-title">
              <AlertCircle /> Recommendations
            </h3>
            <p>{aqiRecommendation?.recommendation || 'No recommendations available.'}</p>
            <p >Mask Recommendation: {aqiRecommendation.sensitiveGroupsMask}</p>
          </div>

          <div className="card">
            <h3 className="recommendation-title">
              <Activity /> Health Advice
            </h3>
            <p>{aqiRecommendation?.healthAdvice || 'No health advice available.'}</p>
          </div>

          <div className="card">
            <h3 className="recommendation-title">
              <Droplet /> Travel Suggestions
            </h3>
            <p>{aqiRecommendation?.travelSuggestion || 'No travel suggestions available.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
