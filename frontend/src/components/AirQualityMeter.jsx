import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

function AirQualityMeter({ type, value }) {
  return (
    <div className="air-quality-meter text-center">
      <h4>{type}</h4>
      <ReactSpeedometer
        maxValue={500}
        value={value}
        needleColor="red"
        startColor="green"
        segments={10}
        endColor="red"
        width={150}
        height={120}
        textColor="black"
      />
    </div>
  );
}

export default AirQualityMeter;
