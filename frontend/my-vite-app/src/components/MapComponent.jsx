import { GoogleMap, Marker } from '@react-google-maps/api';
import mapStyle from '../styles/MapStyle';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lng: -122.45,
  lat: 37.76,
};

function MyMap({markers}) {
  console.log(markers)
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
        icon={{
          // url: '/pin.svg',
          scaledSize: new window.google.maps.Size(60)
          //i === activeIndex ? 60 : 30, i === activeIndex ? 60 : 30
        }}
      />
    ))}
    </GoogleMap>
  );
}

export default MyMap;
