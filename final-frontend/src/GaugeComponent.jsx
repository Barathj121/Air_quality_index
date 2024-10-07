// CustomGauge.jsx
import React from 'react';
import { GaugeComponent } from 'react-gauge-component';

const CustomGauge = ({ value }) => {
  const SIZE_FACTOR = 3.4; // Change this value to resize everything (e.g., 0.5 for smaller, 1 for default size)

  return (
    <GaugeComponent
      type="semicircle"
      arc={{
        width: 0.101 * SIZE_FACTOR, // Adjust width with size factor
        padding: 0.005,
        cornerRadius: 1,
        subArcs: [
          {
            limit: 50,
            color: '#5BE12C', // Green
            showTick: true,
            tooltip: {
              text: 'Good',
            },
          },
          {
            limit: 100,
            color: '#F5CD19', // Yellow
            showTick: true,
            tooltip: {
              text: 'Satisfactory',
            },
          },
          {
            limit: 200,
            color: '#FFA500', // Orange
            showTick: true,
            tooltip: {
              text: 'Moderate',
            },
          },
          {
            limit: 300,
            color: '#EA4228', // Red
            showTick: true,
            tooltip: {
              text: 'Poor',
            },
          },
          {
            limit: 400,
            color: '#800080', // Purple
            showTick: true,
            tooltip: {
              text: 'Very Poor',
            },
          },
          {
            color: '#7B241C', // Maroon
            tooltip: {
              text: 'Hazardous',
            },
          },
        ],
      }}
      pointer={{
        color: '#345243',
        length: 0.3 * SIZE_FACTOR, // Adjust length with size factor
        width: 3 * SIZE_FACTOR,   // Adjust width with size factor
      }}
      // labels={{
      //   valueLabel: { formatTextValue: value => value + ' AQI', fontSize: 12 * SIZE_FACTOR }, // Adjust font size
      //   tickLabels: {
      //     type: 'outer',
      //     valueConfig: { formatTextValue: value => value + ' AQI', fontSize: 8 * SIZE_FACTOR }, // Adjust font size
      //     ticks: [
      //       { value: 0 },
      //       { value: 100 },
      //       { value: 200 },
      //       { value: 300 },
      //       { value: 400 },
      //       { value: 500 },
      //     ],
      //   },
      // }}
      value={value} // This should reflect the actual AQI value passed as a prop
      minValue={0}
      maxValue={500}
      style={{ width: `${150 * SIZE_FACTOR}px`, height: `${75 * SIZE_FACTOR}px` }} // Set width and height based on size factor
    />
  );
};

export default CustomGauge;
