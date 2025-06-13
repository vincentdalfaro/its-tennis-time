
import '../App.css';
import Topbar from '../components/Topbar.jsx'
import MyMap from '../components/MapComponent.jsx'
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo} from "react";
import { fetchParkCoordinates } from '../api/api.jsx';


export default function Map() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);

  const address = searchParams.get('address') || '1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102';

  const defaultDate = new Date().toUTCString();
  const date = searchParams.get('date') || defaultDate;

  const timesParam = searchParams.get('times');
  const times = useMemo(() => timesParam ? timesParam.split(',') : ["Morning", "Afternoon", "Evening"], [timesParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = { address, date, times };
        const response = await fetchParkCoordinates(filters);
        setData(response);
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
        <div style={{ width: '40%', overflowY: 'auto', padding: '1rem' }}>
          <h1 className='white-text'>{address}</h1>
        </div>

        {/* Vertical Divider */}
        <div className="vertical-bar"></div>

        {/* Fixed map area */}
        <div style={{ flex: 1 }}>
          <MyMap />
        </div>
      </div>
    </div>
  );
}