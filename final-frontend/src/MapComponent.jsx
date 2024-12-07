import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ aqiStations = [], isFullscreen, toggleFullscreen }) => {
  const mapRef = useRef(null);

  return (
    <div className={`map-container ${isFullscreen ? 'fullscreen' : ''}`} ref={mapRef}>
      <button onClick={toggleFullscreen} className="fullscreen-toggle">
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>
      <MapContainer center={[11.0168, 76.9558]} zoom={13} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {aqiStations.map((station, index) => (
          <Marker key={index} position={station.position}>
            <Popup>{station.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;