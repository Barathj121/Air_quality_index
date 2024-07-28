import React from 'react';
import { FiMapPin } from 'react-icons/fi';

function Location({ city }) {
  return (
    <div className="location">
      <FiMapPin />
      <span>{city}</span>
    </div>
  );
}

export default Location;
