import { Map, NavigationControl, Marker} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchParkCoordinates } from '../api/api.jsx';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Pin from './pin';
import ControlPanel from './Control-Panel.jsx';

const TOKEN = 'pk.eyJ1IjoidmRhbGZhcm8iLCJhIjoiY21iMDk2MnA3MG9sYzJrcHNveXJ2MnQ2cyJ9.nSBsNvmgeK-6kyHM2-9h2g';

const initialView = {
  longitude: -122.43,
  latitude: 37.76,
  zoom: 11.3,
};

export default function MapComponent() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchParkCoordinates()
      .then(json => {
        setData(json);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const pins = useMemo(
    () =>
      data.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.lng}
          latitude={city.lat}
          anchor="bottom"
        >
          <Pin />
        </Marker>
      )),
    [data]
  );

  return (
    <div className='map-style'
    >
      <Map
        initialViewState={initialView}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={TOKEN} 
        minZoom = {11.3}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        <NavigationControl style={{ position: 'absolute', top: 10, right: 10 }} />
        {pins}
      </Map>
      <div className="control-panel">
        <ControlPanel />
      </div>

    </div>
  );
}