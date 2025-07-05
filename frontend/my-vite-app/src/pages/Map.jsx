import '../App.css';
import Topbar from '../components/Topbar.jsx';
import MyMap from '../components/map/map-component/MapComponent.jsx';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { fetchParkCoordinates, fetchAddressCoordinates } from '../api/api.jsx';
import ParkToken from '../components/map/ParkToken.jsx';
import PreferenceBar from '../components/map/PreferenceBar.jsx';
import dayjs from 'dayjs';

import useTheme from '../components/ThemeObserver.jsx';
import downCaretWhite from '../assets/icons-white/down-caret-white.png';
import upCaretWhite from '../assets/icons-white/up-caret-white.png';
import downCaretBlack from '../assets/icons-black/down-caret-black.png';
import upCaretBlack from '../assets/icons-black/up-caret-black.png';

export default function Map() {
  const [searchParams] = useSearchParams();
  const [searchresult, setResult] = useState();
  const [address, setAddress] = useState(() => searchParams.get('address') || "");
  const [addressCoords, setAddressCoords] = useState(null);

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
  const [showPreferences, setShowPreferences] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  const theme = useTheme();
  const isDark = theme === 'dark';

  // Inside Map function:
const tokenRefs = useRef([]);

// Clear and reset refs when results update
useEffect(() => {
  tokenRefs.current = [];
}, [searchresult]);
const scrollContainerRef = useRef(null);

const scrollToIndex = (index) => {
  const ref = tokenRefs.current[index];
  if (ref && ref.scrollIntoView) {
    ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  setVisibleIndex(index);
};

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = { address, date, times, pickleball };
        const response = await fetchParkCoordinates(filters);
        setResult(response);
      } catch (error) {
        console.error('❌ Error fetching coordinates:', error);
      }
    };

    if (date && times.length > 0) fetchData();
    else if (times.length === 0) setResult([]);
  }, [address, date, times, pickleball]);

  const handleScroll = (e) => {
    const itemHeight = 460;
    const index = Math.floor(e.target.scrollTop / itemHeight);
    setVisibleIndex(index);
    console.log(visibleIndex)
  };

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />
      <div className="horizontal-bar" />

      <div className="map-page-flex" style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div className="map-info" onScroll={handleScroll}>
          {isMobile && showPreferences && (
            <div className="preference-overlay open">
              <div style={{ display: "flex" }}>
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
                <button
                  onClick={() => setShowPreferences(false)}
                  className="close-preferences-button"
                  aria-label="Hide Filters"
                >
                  <img
                    src={isDark ? upCaretWhite : upCaretBlack}  // swap caret icon based on theme
                    alt="Hide filters"
                    style={{ width: '20px', height: '20px' }}
                  />
                </button>
              </div>
            </div>
          )}

          {!isMobile && (
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
          )}

          <div className="vertical-bar-mobile" />
          <div className="horizontal-bar" />

          <div 
            className="parktokens-wrapper" 
            style={{ margin: "0 10px", overflowY: "auto", marginBottom: "10px" }}
            onScroll={handleScroll}
            ref={scrollContainerRef}
          >
            {searchresult?.length > 0 ? (
            getFilteredSearchResults().map((place, index) => (
              <div
                key={place.locationId}
                ref={(el) => tokenRefs.current[index] = el} // ⬅ Attach ref here
              >
                <ParkToken
                  place={place}
                  index={index}
                  pickleball={pickleball}
                  address={address}
                />
              </div>
            ))
          ) : (
            <div className="map-heading">No Courts Available</div>
          )}
          </div>
        </div>

        <div className="vertical-bar" />
        <div className="horizontal-bar-mobile" />

        <div className="map-container" style={{ flex: 1, position: 'relative' }}>
          {isMobile && !showPreferences && (
            <button
              onClick={() => setShowPreferences(true)}
              className="toggle-settings-button-on-map"
              aria-label="Show Filters"
            >
              <img
                src={isDark ? downCaretWhite : downCaretBlack}  // swap caret icon based on theme
                alt="Show filters"
                style={{ width: '20px', height: '20px' }}
              />
            </button>
          )}

          <MyMap 
            markers={getFilteredSearchResults()}
            addressCoords={addressCoords || {}}
            visibleIndex={visibleIndex}
            onMarkerClick={scrollToIndex}
          />
        </div>
      </div>
    </div>
  );
}