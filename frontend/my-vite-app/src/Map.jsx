import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidmRhbGZhcm8iLCJhIjoiY21iMDk2MnA3MG9sYzJrcHNveXJ2MnQ2cyJ9.nSBsNvmgeK-6kyHM2-9h2g';

mapboxgl.accessToken = MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-122.4376, 37.7577],
      zoom: 10.5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => map.current.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;