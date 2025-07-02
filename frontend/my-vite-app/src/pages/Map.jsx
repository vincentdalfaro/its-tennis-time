import '../App.css';
import Topbar from '../components/Topbar.jsx';
import MyMap from '../components/map/map-component/MapComponent.jsx';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchParkCoordinates, fetchAddressCoordinates } from '../api/api.jsx';
import ParkToken from '../components/map/ParkToken.jsx';
import PreferenceBar from '../components/map/PreferenceBar.jsx';
import dayjs from 'dayjs';

export default function Map() {
  // Query Params & State Initialization
  const [searchParams] = useSearchParams();
  const [searchresult, setResult] = useState();
  const [address, setAddress] = useState(() => searchParams.get('address') || "");
  const [addressCoords, setAddressCoords] = useState(null);

  // Default Date and Time Slot
  const now = dayjs();
  const currentHour = now.hour();
  let defaultTimes = ['Morning'];
  let defaultDate = now.startOf('day');

  if (currentHour >= 12 && currentHour < 18) defaultTimes = ['Afternoon'];
  else if (currentHour >= 18 && currentHour <= 20) defaultTimes = ['Evening'];
  else if (currentHour > 20 || currentHour < 6) defaultDate = now.add(1, 'day').startOf('day');

  const [date, setDate] = useState(() =>
    searchParams.get('date') || defaultDate.toDate().toUTCString()
  );

  const [times, setTimes] = useState(() => {
    const timesParam = searchParams.get('times');
    return timesParam ? timesParam.split(',') : defaultTimes;
  });

  const [pickleball, setPickleball] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(null);

  // Fetch Coordinates from Address
  useEffect(() => {
    const fetchCoords = async () => {
      try {
        if (!address) {
          setAddressCoords(null);
          return;
        }
        const location = await fetchAddressCoordinates({ address });
        setAddressCoords(location);
      } catch (error) {
        console.error('❌ Error fetching address coordinates:', error);
        setAddressCoords(null);
      }
    };

    fetchCoords();
  }, [address]);

  // Fetch Parks based on Filters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = { address, date, times, pickleball };
        const response = await fetchParkCoordinates(filters);
        setResult(response);
        console.log(response);
      } catch (error) {
        console.error('❌ Error fetching coordinates:', error);
      }
    };

    if (date && times.length > 0) fetchData();
    else if (times.length === 0) setResult([]);
  }, [address, date, times, pickleball]);

  // Scroll Handler for Map Focus
  const handleScroll = (e) => {
    const itemHeight = 450;
    const index = Math.floor(e.target.scrollTop / itemHeight);
    setVisibleIndex(index);
  };

  // Sort Parks by Distance
  const getFilteredSearchResults = () => {
    if (!searchresult || searchresult.length === 0) return [];
    if (!address) return searchresult;

    const allHaveDistance = searchresult.every(
      (p) => p.distance?.distance_value != null
    );
    if (!allHaveDistance) return searchresult;

    return [...searchresult].sort(
      (a, b) => a.distance.distance_value - b.distance.distance_value
    );
  };

  // Render UI
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />
      <div className="horizontal-bar" />

      <div className="map-page-flex" style={{ flex: 1, overflow: 'hidden' }}>
        
        {/* Sidebar */}
        <div className="map-info" onScroll={handleScroll}>
          <div className="preference-bar-wrapper">
            <PreferenceBar 
              address={address}
              setAddress={setAddress}
              date={date}
              setDate={setDate}
              times={times}
              setTimes={setTimes}
              pickleball={pickleball}
              setPickleball={setPickleball}
            />
          </div>

          <div className="vertical-bar-mobile" />

          <div className="parktokens-wrapper" style={{ margin: "0 10px" }}>
            {searchresult?.length > 0 ? (
              getFilteredSearchResults().map((place, index) => (
                <ParkToken
                  key={place.locationId}
                  place={place}
                  index={index}
                  pickleball={pickleball}
                  address={address}
                />
              ))
            ) : (
              <div className="map-heading">No Courts Available</div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="vertical-bar" />
        <div className="horizontal-bar-mobile" />

        {/* Map Area */}
        <div className="map-container" style={{ flex: 1 }}>
          <MyMap 
            markers={getFilteredSearchResults()}
            addressCoords={addressCoords || {}}
            visibleIndex={visibleIndex}
          />
        </div>
      </div>
    </div>
  );
}
