import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

function CityDisplay({ city, overallAirQuality }) {
  return (
    <div className="city-display-container">
      <h2>{city}</h2>
      <ReactSpeedometer
        maxValue={500}
        value={overallAirQuality}
        needleColor="red"
        startColor="green"
        segments={10}
        endColor="red"
        textColor="black"
        width={300}
        height={250}
      />
    </div>
  );
}

export default CityDisplay;
