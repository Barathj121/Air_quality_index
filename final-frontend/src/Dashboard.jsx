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
  const [showPopup, setShowPopup] = useState(true); // Popup visibility state

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3030/api/aqi/latest");
      if (!response.ok) throw new Error("API not responding");
      const json = await response.json();
      console.log(json.data);
    
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
        timestamp: json.data['timestamp'],
        cause: json.data['cause'],
      };

      setData(apiData);
      setAqiRecommendation(getAQIRecommendation(apiData.AQI));
      setLastUpdated(new Date(apiData.timestamp).toLocaleString());

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
        cause: 0,
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
    if (aqi <= 50) return { level: 'Good', color: '#5BE12C' };
    if (aqi <= 100) return { level: 'Satisfactory', color: '#F5CD19' };
    if (aqi <= 150) return { level: 'Moderately Polluted', color: '#FFA500' };
    if (aqi <= 200) return { level: 'Poor', color: '#EA4228' };
    if (aqi <= 300) return { level: 'Very Poor', color: '#800080' };
    return { level: 'Hazardous', color: '#7B241C' };
  };
  

  if (!data || !aqiRecommendation) return <div>Loading...</div>; // Display loading or message if data is not available
  const closePopup = () => {
    setShowPopup(false);
  };

  
  const PrimaryCause = (cause) => {
    console.log("cause ==>",cause);
    if (cause === 0 )return 'PM 2.5';
    if (cause === 1 )return 'PM10';
    if (cause === 2 )return 'NO2';
    if (cause === 3 )return 'SO2';
    if (cause === 4 )return 'CO';
    if (cause === 5 )return 'Ozone';
    return 'Various Pollutants';


  };



  return (
    
    <div className="container">
      {/* Custom Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content">
            <p className="popup-text">Alert: Air Quality Danger!</p>
            <button onClick={closePopup} className="popup-close">Close</button>
          </div>
        </div>
      )}
      <div className="header">
        <h1 className="title">Dashboard</h1>
        <div className="location">
            <img src="/src/assets/icons/gps_1.png" alt="Location Icon" style={{ width: '16px', height: '16px', marginRight: '5px' }} />
            {location}
        </div>      
      </div>
      <p className="last-updated">Last updated: {lastUpdated}</p>

      <div className="grid grid-cols-6">
        {['PM25', 'PM10', 'NO2', 'SO2', 'CO', 'Ozone'].map((metric, index) => (
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
        {['Temperature', 'Pressure', 'Humidity', 'WindSpeed', 'WindDirection', 'SolarRadiation'].map((metric, index) => (
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
          <h1 className="metric-title center-text-metergauge">Air Quality Index (AQI) </h1>
          <div className="aqi-content">
            <CustomGauge value={data.AQI} />
          </div>

          <div className="aqi-info">
            <center><p className="below-name-style"><b>AQI: {data.AQI}</b></p></center>
            <center><p className="aqi-level" style={{ color: getAQILevel(data.AQI).color }}><b>{getAQILevel(data.AQI).level}</b></p></center>
           <center> <p className="aqi-cause"><b>Primary Cause: </b>{PrimaryCause(data.cause)}</p></center>
          </div>
 
          <div class="recommendations-icons">
            <div class="recommendation-icon">
              <img src="src/assets/icons/solution_use-purifier.svg" alt="Air Purifier" />
              <p className='image-text'><b>Air Purifier</b></p>
              <p className='image-text'>{aqiRecommendation.airpurifier_suggestion}</p>
            </div>
            <div class="recommendation-icon">
              <img src="src/assets/icons/solution_car-filter.svg" alt="Car Filter" />
              <p className='image-text'><b>Car Filter</b></p>
              <p className='image-text'>{aqiRecommendation.car_filter_suggestion}</p>
            </div>
            <div class="recommendation-icon">
              <img src="src/assets/icons/solution_wear-mask.svg" alt="N95 Mask" />
              <p className='image-text'><b>N95 Mask</b></p>
              <p className='image-text'>{aqiRecommendation.n95_mask_suggestion}</p>
            </div>
            <div class="recommendation-icon">
              <img src="src/assets/icons/solution_stay-indoor.svg" alt="Stay Indoor" />
              <p className='image-text'><b>Stay Indoor</b></p>
              <p className='image-text'>{aqiRecommendation.stay_indoor}</p>
            </div>
          </div>
        </div>

        <div className="recommendations-container col-span-1 ">
          <div className="card line-spacing">
            <h3 className="recommendation-title">
              <AlertCircle /> Recommendations
            </h3>
            {aqiRecommendation?.recommendation || 'No recommendations available.'}<br></br>
            {/* {aqiRecommendation.sensitiveGroupsMask}<br></br> */}
            {aqiRecommendation.windowsOpen}<br></br>
            {/* {aqiRecommendation.purifierRequired} */}
            </div>

          <div className="card line-spacing">
            <h3 className="recommendation-title">
              <Activity /> Health Advice
            </h3>
            <p>{aqiRecommendation?.healthAdvice || 'No health advice available.'}</p>
          </div>

          <div className="card line-spacing">
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
