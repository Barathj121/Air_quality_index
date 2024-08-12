import React from 'react'
import './OverallAirQualityMeter.css'

function OverallAirQualityMeter({ value }) {
  return (
    <div className="overall-air-quality-meter text-center">
      <h2>Overall Air Quality</h2>
      <div className="meter">
        <div className="meter-bar" style={{ width: `${value}%` }}></div>
      </div>
      <p>{value}</p>
    </div>
  )
}

export default OverallAirQualityMeter
