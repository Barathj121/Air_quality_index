import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AdvancedAnalysis.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const AdvancedAnalysis = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForecastData();
  }, []);

  const fetchForecastData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3030/api/forecast');
      const result = await response.json();
      
      if (result.data && result.data.data) {
        const formattedData = {
          labels: result.data.data.map(item => {
            const date = new Date(item.timestamp);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }).reverse(),
          datasets: [{
            label: 'AQI Forecast',
            data: result.data.data.map(item => Number(item.AQI)).reverse(),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            fill: false
          }]
        };
        setForecastData(formattedData);
      }
    } catch (err) {
      setError('Failed to fetch forecast data');
      console.error('Error fetching forecast data:', err);
    } finally {
      setLoading(false);
    }
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
          {loading ? (
            <p>Loading forecast data...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : forecastData ? (
            <Line data={forecastData} />
          ) : (
            <p>No forecast data available</p>
          )}
        </div>
        <div className="chart">
          <center><h2>Real-time Data</h2></center>
          <Line data={realtimeData} />
        </div>
      </div>

      <div className="alert-boxes">
        <div className="aqi-alert">
          <h3>AQI Alert</h3>
          <p>Current AQI: {forecastData?.datasets[0]?.data[0] || 'N/A'} 
             ({forecastData?.datasets[0]?.data[0] > 100 ? 'Unhealthy' : 'Moderate'})</p>
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




// import React, { useState, useEffect } from 'react';
// import { Line, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import './AdvancedAnalysis.css';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

// const AdvancedAnalysis = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [forecastData, setForecastData] = useState(null);
//   const [historicalData, setHistoricalData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [historyLoading, setHistoryLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [historyError, setHistoryError] = useState(null);

//   useEffect(() => {
//     fetchForecastData();
//     fetchHistoricalData(); // Initial fetch for current date range
//   }, []);

//   const fetchForecastData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:3030/api/forecast');
//       const result = await response.json();
      
//       if (result.data && result.data.data) {
//         const formattedData = {
//           labels: result.data.data.map(item => {
//             const date = new Date(item.timestamp);
//             return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//           }).reverse(),
//           datasets: [{
//             label: 'AQI Forecast',
//             data: result.data.data.map(item => Number(item.AQI)).reverse(),
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1,
//             fill: false
//           }]
//         };
//         setForecastData(formattedData);
//       }
//     } catch (err) {
//       setError('Failed to fetch forecast data');
//       console.error('Error fetching forecast data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchHistoricalData = async () => {
//     try {
//       setHistoryLoading(true);
//       setHistoryError(null);
      
//       // Format dates for API request
//       const formattedStartDate = startDate.toISOString().split('T')[0];
//       const formattedEndDate = endDate.toISOString().split('T')[0];
      
//       const response = await fetch(
//         `http://localhost:3030/api/historical?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
//       );
      
//       const data = await response.json();
      
//       if (data.success && data.data) {
//         setHistoricalData(data.data);
//       } else {
//         setHistoryError('No historical data available');
//       }
//     } catch (err) {
//       setHistoryError('Failed to fetch historical data');
//       console.error('Error fetching historical data:', err);
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   const realtimeData = {
//     labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25'],
//     datasets: [{
//       label: 'Real-time AQI',
//       data: [80, 82, 85, 87, 85, 83],
//       borderColor: 'rgb(255, 99, 132)',
//       tension: 0.1
//     }]
//   };

//   const pollutionIncreaseData = {
//     labels: ['1h', '2h', '3h', '4h', '5h', '6h'],
//     datasets: [{
//       label: 'Predicted AQI Increase',
//       data: [85, 90, 100, 110, 105, 95],
//       borderColor: 'rgb(153, 102, 255)',
//       tension: 0.1
//     }]
//   };

//   const downloadCSV = () => {
//     if (historicalData.length === 0) {
//       alert('No data available to download');
//       return;
//     }

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + "Date,AQI,PM2.5,PM10\n"
//       + historicalData.map(row => `${row.date},${row.aqi},${row.pm25},${row.pm10}`).join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "air_quality_data.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="advanced-analysis">
//       <h1>AQI Forecast</h1>
      
//       <div className="charts-container">
//         <div className="chart">
//           <center><h2>AQI Forecast Trend</h2></center>
//           {loading ? (
//             <p>Loading forecast data...</p>
//           ) : error ? (
//             <p className="error">{error}</p>
//           ) : forecastData ? (
//             <Line data={forecastData} />
//           ) : (
//             <p>No forecast data available</p>
//           )}
//         </div>
//         <div className="chart">
//           <center><h2>Real-time Data</h2></center>
//           <Line data={realtimeData} />
//         </div>
//       </div>

//       <div className="alert-boxes">
//         <div className="aqi-alert">
//           <h3>AQI Alert</h3>
//           <p>Current AQI: {forecastData?.datasets[0]?.data[0] || 'N/A'} 
//              ({forecastData?.datasets[0]?.data[0] > 100 ? 'Unhealthy' : 'Moderate'})</p>
//           <p>Main Pollutant: PM2.5</p>
//           <p>Take necessary precautions if you're sensitive to air pollution.</p>
//         </div>

//         <div className="smart-alert">
//           <center><h3>Smart Alert</h3></center>
//           <p>Pollution increase likely in the next 6 hours</p>
//           <div className="pollution-graph">
//             <Line data={pollutionIncreaseData} />
//           </div>
//         </div>
//       </div>
      
//       <div className="data-table">
//         <h2>Historical Data</h2>
//         <div className="date-pickers">
//           <DatePicker 
//             selected={startDate} 
//             onChange={(date) => setStartDate(date)}
//             maxDate={endDate}
//           />
//           <DatePicker 
//             selected={endDate} 
//             onChange={(date) => setEndDate(date)}
//             minDate={startDate}
//           />
//           <button 
//             onClick={fetchHistoricalData}
//             disabled={historyLoading}
//           >
//             {historyLoading ? 'Loading...' : 'Fetch Data'}
//           </button>
//           <button 
//             onClick={downloadCSV}
//             disabled={historicalData.length === 0 || historyLoading}
//           >
//             Download CSV
//           </button>
//         </div>
        
//         {historyError ? (
//           <p className="error">{historyError}</p>
//         ) : historyLoading ? (
//           <p>Loading historical data...</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>AQI</th>
//                 <th>PM2.5</th>
//                 <th>PM10</th>
//               </tr>
//             </thead>
//             <tbody>
//               {historicalData.length > 0 ? (
//                 historicalData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{row.date}</td>
//                     <td>{row.aqi}</td>
//                     <td>{row.pm25}</td>
//                     <td>{row.pm10}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4">No historical data available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdvancedAnalysis;