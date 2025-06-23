import { GoogleMap, Marker } from '@react-google-maps/api';
import mapStyle from './MapStyle';
import mapIcon from '../../assets/map-icon.png'

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lng: -122.43,
  lat: 37.756,
};

function MyMap({markers, addressCoords, visibleIndex}) {

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12.8}
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
        icon={{
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(
            visibleIndex === i ? 60 : 30,
            visibleIndex === i ? 60 : 30
          )
        }}
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
