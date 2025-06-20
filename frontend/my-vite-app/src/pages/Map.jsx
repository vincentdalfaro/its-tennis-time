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
  

  {/* Given Address */}
  const [addressCoords, setAddressCoords] = useState(null);
  const [address, setAddress] = useState(() => {
    return searchParams.get('address') || '1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102'
  })

  {/* Given Date */}
  const [date, setDate] = useState(() => {
    return searchParams.get('date') || dayjs().startOf('day').toDate().toUTCString();
  });

    
  {/* Given Time Slots */}
  const timesParam = searchParams.get('times');
  const listItemRefs = useRef([]);
  const [times, setTimes] = useState(() => {
    return timesParam ? timesParam.split(',') : ['Morning'];
  });

  {/* Pickleball Enabler */}
  const [pickleball, setPickleball] = useState(false);

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
        console.log(response);
      } catch (error) {
        console.error('❌ Error fetching coordinates:', error);
      }
    };

    if (address && date && times.length > 0) {
      fetchData();
    }

    else if(times.length == 0){
        setResult([])
    }

  }, [address, date, times, pickleball]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />

      {/* Horizontal Bar */}
      <div className="horizontal-bar" />

      {/* Main content: full height */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
        {/* Scrollable left column */}
        <div style={{ width: '40%', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none',}}>
        
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

          {/* Renders Parks Information depending on an address or not*/}
          <div style = {{marginLeft: "10px", marginRight: "10px"}}>
            {searchresult?.length > 0 ? (
            searchresult.every(p => p.distance?.distance_value != null)
              ? [...searchresult]
                  .sort((a, b) => a.distance.distance_value - b.distance.distance_value)
                  .map((place, index) => (
                    <ParkToken
                      key={place.locationId}
                      place={place}
                      index={index}
                      listItemRefs={listItemRefs}
                    />
                  ))
              : searchresult.map((place, index) => (
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
        </div>

        {/* Vertical Divider */}
        <div className="vertical-bar"></div>

        {/* Fixed map area */}
        <div style={{ flex: 1 }}>
          <MyMap markers={Array.isArray(searchresult) ? searchresult : []} addressCoords={addressCoords || {}} />
        </div>
      </div>
    </div>
  );
}
