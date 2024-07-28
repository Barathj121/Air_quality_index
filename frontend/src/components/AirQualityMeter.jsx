import React from 'react'
import './AirQualityMeter.css'

function AirQualityMeter({ type, value }) {
  return (
    <div className="air-quality-meter">
      <h3>{type}</h3>
      <div className="meter">
        <div className="meter-bar" style={{ width: `${value}%` }}></div>
      </div>
      <p>{value}</p>
    </div>
  )
}

export default AirQualityMeter
