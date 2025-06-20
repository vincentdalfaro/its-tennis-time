import { GoogleMap, Marker } from '@react-google-maps/api';
import mapStyle from './MapStyle';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lng: -122.45,
  lat: 37.76,
};

function MyMap({markers, addressCoords}) {

  console.log(addressCoords)

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={{
        styles: mapStyle,
        scrollwheel: true,
        disableDefaultUI: true,
        gestureHandling: 'greedy',
        minZoom: 12,
      }}
    >
      {markers.map((marker, i) => (
      <Marker
        key={marker.locationId}
        position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
      /> 
     ))}

    {addressCoords?.lat && addressCoords?.lng && (
      <Marker
        position={{ lat: addressCoords.lat, lng: addressCoords.lng }}
        icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      />
    )}

    </GoogleMap>
  );
}

export default MyMap;
