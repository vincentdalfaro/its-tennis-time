
import '../App.css';
import Topbar from '../components/Topbar.jsx'
import MyMap from '../components/MapComponent.jsx'
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef} from "react";
import { fetchParkCoordinates } from '../api/api.jsx';


export default function Map() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState();

  const address = searchParams.get('address') || '1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102';

  const defaultDate = new Date().toUTCString();
  const date = searchParams.get('date') || defaultDate;

  const timesParam = searchParams.get('times');
  const times = useMemo(() => timesParam ? timesParam.split(',') : ["Morning"], [timesParam]);
  const listItemRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = { address, date, times };
        const response = await fetchParkCoordinates(filters);
        setData(response);
        console.log(response)
      } catch (error) {
        console.error("❌ Error fetching coordinates:", error);
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
      <div className='horizontal-bar'/>

      {/* Main content: full height */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Scrollable left column */}
        <div style={{ width: '40%', overflowY: 'auto', padding: '1rem'}}>

          {data?.map((place, index) => (
            <div
              key={place.locationId}
              ref={el => (listItemRefs.current[index] = el)}
              data-index={index}
              className="place-item"
              style = {{color: "white"}}
            >
              {place.name}
              {place.courts && place.courts.length > 0 ? (
      place.courts.map((court) => (
        <div key={court.courtId} style={{ marginBottom: '1rem' }}>
          <strong>Court ID:</strong> {court.courtId}
          <div style={{ marginTop: '0.5rem' }}>
            Available times:
            {court.availableTimes && court.availableTimes.length > 0 ? (
              court.availableTimes.map((timeStr, i) => {
                const time = new Date(timeStr);
                const formatted = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      marginRight: '0.5rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#444',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                    }}
                  >
                    {formatted}
                  </span>
                );
              })
            ) : (
              <span>No available times</span>
            )}
          </div>
        </div>
      ))
    ) : (
      <p>No courts available</p>
    )}
            </div>
          ))}
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