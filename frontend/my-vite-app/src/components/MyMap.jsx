import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.7128, // example: New York City
  lng: -74.0060
};

function MyMap() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCULV2-StRVI93clu9cIcrq11ldMzGq1g8">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MyMap;