import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import CityDisplay from './components/CityDisplay'
import AirQualityMeter from './components/AirQualityMeter'
import TopNavbar from './components/TopNavbar'

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
]

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <TopNavbar />
        <CityDisplay />
        <div className="meters-container">
          {airQualityData.map((data, index) => (
            <AirQualityMeter key={index} type={data.type} value={data.value} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
