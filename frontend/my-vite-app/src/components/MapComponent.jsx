import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import mapStyle from '../styles/MapStyle';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const MapKey = import.meta.env.VITE_MAP_KEY;

const center = {
  lng: -122.45,
  lat: 37.76,
};

function MyMap() {
  
  return (
    <LoadScript googleMapsApiKey={MapKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{
          styles: mapStyle,
          scrollwheel: true,
          disableDefaultUI: true,
          gestureHandling: "greedy",
           minZoom: 12,
        }}
      >
      </GoogleMap>
    </LoadScript>
  );
}

    

export default MyMap;