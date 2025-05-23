/* global window */
import * as React from 'react';
import {useState, useCallback, useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import {Map, NavigationControl} from 'react-map-gl/mapbox';

const TOKEN = 'pk.eyJ1IjoidmRhbGZhcm8iLCJhIjoiY21iMDk2MnA3MG9sYzJrcHNveXJ2MnQ2cyJ9.nSBsNvmgeK-6kyHM2-9h2g'; // Set your mapbox token here

const initialView = {
  longitude: -122.43,
  latitude: 37.78,
  zoom: 10.5,
};

export default function App() {

  return (
    <>
      <div style={{position: 'relative', height: '500px', width: '1000px'}}>
  <Map
    initialViewState={initialView}
    mapStyle="mapbox://styles/mapbox/light-v9"
    mapboxAccessToken={TOKEN}
  >
    <NavigationControl />
  </Map>
</div>
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}