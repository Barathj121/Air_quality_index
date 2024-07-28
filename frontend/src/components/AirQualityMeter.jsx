import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';

const AirQualityMeter = ({ type, value }) => {
  const [gaugeValue, setGaugeValue] = useState(value / 500); // Convert value to a range between 0 and 1

  useEffect(() => {
    setGaugeValue(value / 500); // Update gauge value when the prop value changes
  }, [value]);

  return (
    <div className="meter-container">
      <h3>{type}</h3>
      <GaugeChart
        id={`gauge-chart-${type}`}
        nrOfLevels={10}
        percent={gaugeValue}
        colors={[
          '#00FF00', '#66FF00', '#CCFF00', '#FFFF00', '#FFCC00',
          '#FF9900', '#FF6600', '#FF3300', '#FF0000', '#CC0000'
        ]}
        arcWidth={0.3}
        needleColor="red"
        textColor="#000000"
        style={{ width: "80%" }}
      />
    </div>
  );
};

export default AirQualityMeter;
