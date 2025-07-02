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

export default function PreferenceBar({
  address, 
  setAddress, 
  date, 
  setDate, 
  times, 
  setTimes, 
  pickleball, 
  setPickleball
}) {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 465;
  const theme = useTheme();

  const mobileWidth = "100%";
  const desktopWidths = {
    date: "150px",
    address: "215px",
    select: "275px",
    pickleball: "90px"
  };

  const selectStyles = useMemo(() =>
    SelectStyle({ width: isMobile ? mobileWidth : desktopWidths.select, height: 30, theme }),
    [theme, isMobile]
  );

  return (
    <div
      className="preference_box"
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'flex-start',
        gap: isMobile ? '10px' : '15px',
        flexWrap: 'wrap',
        width: isMobile ? '100%' : 'auto',
      }}
    >
      {/* Mobile Header */}
      {isMobile && (
        <div style={{ fontSize: "25px", width: "100%" }}>
          Settings
          <div
            style={{
              height: "2px",
              width: mobileWidth,
              backgroundColor: "var(--text-color)",
              marginTop: "4px"
            }}
          />
        </div>
      )}

      {/* Date Picker */}
      <DateButton 
        date={date}
        width={isMobile ? mobileWidth : desktopWidths.date}
        onChange={(date) => setDate(dayjs.utc(date).toDate().toUTCString())}
      />

      {/* Address Input */}
      <AutocompleteSearch 
        setAddress={setAddress}
        placeholder={"Address"}
        address={address}
        value={address}
        width={isMobile ? mobileWidth : desktopWidths.address}
      />

      {/* Time Selector */}
      <div style={{ width: isMobile ? mobileWidth : desktopWidths.select }}>
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
      </div>

      {/* Pickleball Toggle Button */}
      <button 
        className={pickleball ? 'pickle-true' : 'pickle-false'}
        style={{
          width: isMobile ? mobileWidth : desktopWidths.pickleball,
          height: isMobile ? "40px" : "38px",
          fontSize: "15px"
        }}
        onClick={() => setPickleball(!pickleball)}
      >
        Pickleball
      </button>
    </div>
  );
}
