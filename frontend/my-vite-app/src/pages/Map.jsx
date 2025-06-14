import '../App.css';
import Topbar from '../components/Topbar.jsx';
import MyMap from '../components/map/MapComponent.jsx';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import { fetchParkCoordinates } from '../api/api.jsx';
import ParkToken from '../components/ParkToken.jsx';
import PreferenceBar from '../components/PreferenceBar.jsx'

export default function Map() {

  const [searchParams] = useSearchParams();
  const [data, setData] = useState();

  const address = searchParams.get('address') || '1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102';

  const defaultDate = new Date().toUTCString();
  const date = searchParams.get('date') || defaultDate;

  const timesParam = searchParams.get('times');
  const times = useMemo(() => (timesParam ? timesParam.split(',') : ['Morning']), [timesParam]);
  const listItemRefs = useRef([]);

  {/* Making a call to the API given choices */}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = { address, date, times };
        const response = await fetchParkCoordinates(filters);
        setData(response);
        console.log(response);
      } catch (error) {
        console.error('❌ Error fetching coordinates:', error);
      }
    };

    if (address && date && times.length > 0) {
      fetchData();
    }
  }, [address, date, times]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />

      {/* Horizontal Bar */}
      <div className="horizontal-bar" />

      {/* Main content: full height */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
        {/* Scrollable left column */}
        <div style={{ width: '40%', overflowY: 'auto'}}>
        <PreferenceBar/>   

        {/* Each park represented by a token that shows relevant info*/}
        {data?.length > 0 ? (
          data.map((place, index) => (
            <ParkToken
              key={place.locationId}
              place={place}
              index={index}
              listItemRefs={listItemRefs}
            />
          ))
        ) : (
          <p>No courts available</p>
        )}
        </div>

        {/* Vertical Divider */}
        <div className="vertical-bar"></div>

        {/* Fixed map area */}
        <div style={{ flex: 1 }}>
          <MyMap markers={Array.isArray(data) ? data : []} />
        </div>
      </div>
    </div>
  );
}
