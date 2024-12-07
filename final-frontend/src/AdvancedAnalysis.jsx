// AdvancedAnalysis.jsx
import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AdvancedAnalysis.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const AdvancedAnalysis = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
      <h1>AQI Forecast</h1>
      
      <div className="charts-container">
        <div className="chart">
          <center><h2>AQI Forecast Trend</h2></center>
          <Line data={aqiForecastData} />
        </div>
        <div className="chart">
          <center><h2>Real-time Data</h2></center>
          <Line data={realtimeData} />
        </div>
      </div>

      <div className="alert-boxes">
        <div className="aqi-alert">
          <h3>AQI Alert</h3>
          <p>Current AQI: 85 (Moderate)</p>
          <p>Main Pollutant: PM2.5</p>
          <p>Take necessary precautions if you're sensitive to air pollution.</p>
        </div>

        <div className="smart-alert">
          <center><h3>Smart Alert</h3></center>
          <p>Pollution increase likely in the next 6 hours</p>
          <div className="pollution-graph">
            <Line data={pollutionIncreaseData} />
          </div>
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
    </div>
  );
};

export default AdvancedAnalysis;
