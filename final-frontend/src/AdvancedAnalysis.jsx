import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'leaflet/dist/leaflet.css';
import './AdvancedAnalysis.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const AdvancedAnalysis = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const mapRef = useRef(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const mapContainer = mapRef.current;
      if (mapContainer.requestFullscreen) {
        mapContainer.requestFullscreen();
      } else if (mapContainer.mozRequestFullScreen) {
        mapContainer.mozRequestFullScreen();
      } else if (mapContainer.webkitRequestFullscreen) {
        mapContainer.webkitRequestFullscreen();
      } else if (mapContainer.msRequestFullscreen) {
        mapContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const aqiStations = [
    { position: [11.0168, 76.9558], name: "Coimbatore Central" },
    { position: [11.0317, 77.0334], name: "Kurichi" },
    { position: [11.0235, 76.9502], name: "R.S. Puram" },
    { position: [11.0016, 76.9731], name: "Peelamedu" },
    { position: [11.0210, 77.0021], name: "Ganapathy" },
  ];

  const aqiForecastData = {
    labels: ['12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
    datasets: [{
      label: 'AQI Forecast',
      data: [50, 60, 75, 90, 100, 110, 105, 95, 85, 70, 65, 55],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const realtimeData = {
    labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25'],
    datasets: [{
      label: 'Real-time AQI',
      data: [80, 82, 85, 87, 85, 83],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }]
  };

  const smartAlertData = {
    labels: ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous'],
    datasets: [{
      data: [15, 30, 25, 15, 10, 5],
      backgroundColor: ['#00E400', '#FFFF00', '#FF7E00', '#FF0000', '#8F3F97', '#7E0023']
    }]
  };

  const pollutionIncreaseData = {
    labels: ['1h', '2h', '3h', '4h', '5h', '6h'],
    datasets: [{
      label: 'Predicted AQI Increase',
      data: [85, 90, 100, 110, 105, 95],
      borderColor: 'rgb(153, 102, 255)',
      tension: 0.1
    }]
  };

  const tableData = [
    { date: '2023-05-01', aqi: 75, pm25: 20, pm10: 45 },
    { date: '2023-05-02', aqi: 80, pm25: 22, pm10: 48 },
    { date: '2023-05-03', aqi: 70, pm25: 18, pm10: 40 },
    { date: '2023-05-04', aqi: 85, pm25: 25, pm10: 52 },
    { date: '2023-05-05', aqi: 90, pm25: 28, pm10: 55 },
    { date: '2023-05-06', aqi: 65, pm25: 15, pm10: 35 },
    { date: '2023-05-07', aqi: 72, pm25: 19, pm10: 42 },
    { date: '2023-05-08', aqi: 78, pm25: 21, pm10: 47 },
    { date: '2023-05-09', aqi: 82, pm25: 23, pm10: 50 },
    { date: '2023-05-10', aqi: 68, pm25: 17, pm10: 38 },
  ];

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,AQI,PM2.5,PM10\n"
      + tableData.map(row => `${row.date},${row.aqi},${row.pm25},${row.pm10}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "air_quality_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="advanced-analysis">
      <h1>Advanced Analysis</h1>
      
      <div className={`map-container ${isFullscreen ? 'fullscreen' : ''}`} ref={mapRef}>
        <button onClick={toggleFullscreen} className="fullscreen-toggle">
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
        <MapContainer center={[11.0168, 76.9558]} zoom={13} className="map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {aqiStations.map((station, index) => (
            <Marker key={index} position={station.position}>
              <Popup>{station.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h2>AQI Forecast Trend</h2>
          <Line data={aqiForecastData} />
        </div>
        <div className="chart">
          <h2>Real-time Data</h2>
          <Line data={realtimeData} />
        </div>
      </div>

      <div className="data-table">
        <h2>Historical Data</h2>
        <div className="date-pickers">
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          <button>Fetch Data</button>
          <button onClick={downloadCSV}>Download CSV</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>AQI</th>
              <th>PM2.5</th>
              <th>PM10</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.aqi}</td>
                <td>{row.pm25}</td>
                <td>{row.pm10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="alert-boxes">
        <div className="aqi-alert">
          <h3>AQI Alert</h3>
          <p>Current AQI: 85 (Moderate)</p>
          <p>Main Pollutant: PM2.5</p>
          <p>Take necessary precautions if you're sensitive to air pollution.</p>
        </div>

        <div className="smart-alert">
          <h3>Smart Alert</h3>
          <p>Pollution increase likely in the next 6 hours</p>
          <div className="pollution-graph">
            <Line data={pollutionIncreaseData} />
          </div>
        </div>
      </div>
      {/* <h4>AQI Level Probabilities</h4> */}

      {/* <div className="pie-chart">
            <Pie data={smartAlertData} />
          </div> */}
    </div>
    
  );
};

export default AdvancedAnalysis;