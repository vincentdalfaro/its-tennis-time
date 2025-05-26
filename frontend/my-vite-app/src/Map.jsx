import React from 'react';
import { Map, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = 'pk.eyJ1IjoidmRhbGZhcm8iLCJhIjoiY21iMDk2MnA3MG9sYzJrcHNveXJ2MnQ2cyJ9.nSBsNvmgeK-6kyHM2-9h2g';

const initialView = {
  longitude: -122.43,
  latitude: 37.78,
  zoom: 11.5,
};

export default function MapComponent() {
  return (
    <div
      style={{
        position: 'relative',
        height: '500px',
        width: '1000px',
        display: 'block', // ✅ Ensures it's treated as a block element
      }}
    >
      <Map
        initialViewState={initialView}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={TOKEN}
        style={{
          width: '100%',
          height: '100%',
          display: 'block', // ✅ Prevents collapsing map
        }}
      >
        <NavigationControl style={{ position: 'absolute', top: 10, right: 10 }} />
      </Map>
    </div>
  );
}