import '../../App.css';
import Select from 'react-select';
import { useMemo } from 'react';
import SelectStyle from '../select/SelectStyle.jsx';
import DateButton from '../calendar/DateButton.jsx';
import AutocompleteSearch from '../Autocomplete.jsx';
import dayjs from 'dayjs';
import CustomValueContainer from '../select/CustomValueContainer.jsx';
import CustomClearIndicator from '../select/CustomClear.jsx';
import useTheme from "../ThemeObserver.jsx";
import { timeSlots } from "../../constants/TimeSlots.jsx";
import useWindowWidth from './UseWindowWidth.jsx';

export default function ({
  address, 
  setAddress, 
  date, 
  setDate, 
  times, 
  setTimes, 
  pickleball, 
  setPickleball
}) {
  // Determine if user is on mobile
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 900;

  // Theme + Custom styles for react-select
  const theme = useTheme();
  const selectStyles = useMemo(() => 
    SelectStyle({ width: isMobile ? "215px" : "275px", height: 30, theme }), 
    [theme, isMobile]
  );

  // Render UI
  return (
    <div className="preference_box">

      {/* Mobile Header */}
      {isMobile && (
        <div style={{ fontSize: "25px" }}>
          Settings
          <div style={{ height: "2px", width: "215px", backgroundColor: "var(--text-color)", marginTop: "4px" }} />
        </div>
      )}

      {/* Time Selector */}
      <Select
        isMulti
        closeMenuOnSelect={false}
        styles={selectStyles}
        options={timeSlots}
        className="my-select"
        classNamePrefix="custom-select"
        placeholder="Choose a time"
        value={timeSlots.filter(slot => times.includes(slot.value))}
        hideSelectedOptions={false}
        components={{ 
          ValueContainer: CustomValueContainer,
          ClearIndicator: CustomClearIndicator
        }}
        onChange={(selected) => setTimes(selected.map(s => s.value))}
      />

      {/* Pickleball Toggle Button */}
      <button 
        className={pickleball ? 'pickle-true' : 'pickle-false'}
        style={{
          width: isMobile ? "215px" : "100px",
          height: isMobile ? "40px" : "38px",
          fontSize: "15px"
        }}
        onClick={() => setPickleball(!pickleball)}
      >
        Pickleball
      </button>

      {/* Address Input */}
      <AutocompleteSearch 
        setAddress={setAddress}
        placeholder={"Address"}
        address={address}
        value={address}
        width={isMobile ? "215px" : "215px"}
      />

      {/* Date Picker */}
      <DateButton 
        date={date}
        width={isMobile ? "215px" : "160px"}
        onChange={(date) => setDate(dayjs.utc(date).toDate().toUTCString())}
      />
    </div>
  );
}
