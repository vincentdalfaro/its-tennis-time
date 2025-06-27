import '../App.css';
import Topbar from '../components/Topbar.jsx';
import MyMap from '../components/map/MapComponent.jsx';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import { fetchParkCoordinates, fetchAddressCoordinates } from '../api/api.jsx';
import ParkToken from '../components/ParkToken.jsx';
import PreferenceBar from '../components/PreferenceBar.jsx'
import dayjs from 'dayjs'
export default function Map() {

  {/* API Calls */}
  const [searchParams] = useSearchParams();
  const [searchresult, setResult] = useState();
  
  {/* Logic for default date/times */}
  let defaultTimes = ['Morning'];
  let defaultDate = dayjs().startOf('day');
  const now = dayjs();
  const currentHour = now.hour();

  if (currentHour >= 6 && currentHour < 12) {
    defaultTimes = ['Morning'];
    defaultDate = now.startOf('day');
  } else if (currentHour >= 12 && currentHour < 18) {
    defaultTimes = ['Afternoon'];
    defaultDate = now.startOf('day');
  } else if (currentHour >= 18 && currentHour <= 20) {
    defaultTimes = ['Evening'];
    defaultDate = now.startOf('day');
  } else if (currentHour > 20 || currentHour < 6) {
    defaultTimes = ['Morning'];
    defaultDate = now.add(1, 'day').startOf('day');
  }

  {/* Given Address */}
  const [addressCoords, setAddressCoords] = useState(null);
  const [address, setAddress] = useState(() => {
    return searchParams.get('address') || ""
  })

  {/* Given Date */}
  const [date, setDate] = useState(() => {
    return searchParams.get('date') || defaultDate.toDate().toUTCString();
  });
    
  {/* Given Time Slots */}
  const timesParam = searchParams.get('times');
  const [times, setTimes] = useState(() => {
    return timesParam ? timesParam.split(',') : defaultTimes;
  });

  {/* Pickleball Enabler */}
  const [pickleball, setPickleball] = useState(false);

  {/* Map Icon Sizes on focus*/}
  const [visibleIndex, setVisibleIndex] = useState(null);
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const itemHeight = 450;
    const index = Math.floor(scrollTop / itemHeight);
    setVisibleIndex(index);
  };

  {/* Given address, returns the coordinates */}
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

  {/* Making a call to the API with given choices */}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = { address, date, times, pickleball };
        const response = await fetchParkCoordinates(filters);
        setResult(response);
        console.log(response)

      } catch (error) {
        console.error('❌ Error fetching coordinates:', error);
      }
    };

    if (date && times.length > 0) {
      fetchData();
    } else if (times.length === 0) {
      setResult([]);
    }
  }, [address, date, times, pickleball]);

  {/* Helper Function to sort based on distance from address to park*/}
  const getFilteredSearchResults = () => {
    if (!searchresult || searchresult.length === 0) return [];

    // Don't sort if no address is given
    if (!address) return searchresult;

    const allHaveDistance = searchresult.every(
      (p) => p.distance?.distance_value != null
    );

    if (!allHaveDistance) return searchresult;

    return [...searchresult].sort(
      (a, b) => a.distance.distance_value - b.distance.distance_value
    );
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />

      {/* Horizontal Bar */}
      <div className="horizontal-bar" />

      {/* Main content: full height */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
        {/* Scrollable left column */}
        <div style={{ width: '29%', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none'}} onScroll={handleScroll}>
        
          {/* Preference Bar */}
          <PreferenceBar 
            address = {address} 
            setAddress={setAddress} 
            date = {date} 
            setDate = {setDate} 
            times = {times}
            setTimes = {setTimes}
            pickleball = {pickleball}
            setPickleball = {setPickleball}
          />   

          {/* For every park create a token and then sort based off distance*/}
          <div style={{ marginLeft: "10px", marginRight: "10px" }}>
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
              <div style = {{color: "white", fontSize: "35px", fontFamily: "Futura", marginLeft: "30px", marginTop: "200px"}}>
                  No Courts Available
              </div>
            )}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="vertical-bar"></div>

        {/* Fixed map area */}
        <div style={{ flex: 1 }}>
          <MyMap 
            markers={getFilteredSearchResults()} 
            addressCoords={addressCoords || {}}
            visibleIndex = {visibleIndex} 
          />
        </div>
      </div>
    </div>
  );
}