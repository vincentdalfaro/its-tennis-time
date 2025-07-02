import '../../App.css';
import Select from 'react-select';
import { useMemo } from 'react';
import SelectStyle from '../select/SelectStyle.jsx';
import DateButton from '../calendar/DateButton.jsx';
import AutocompleteSearch from '../Autocomplete.jsx';
import dayjs from 'dayjs';
import CustomValueContainer from '../select/CustomValueContainer.jsx';
import CustomClearIndicator from '../select/CustomClear.jsx';
import useTheme from '../ThemeObserver.jsx';
import { timeSlots } from '../../constants/TimeSlots.jsx';
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
  const isMobile = windowWidth < 768;

  const theme = useTheme();
  const selectStyles = useMemo(
    () => SelectStyle({ width: '100%', height: 40, theme }),
    [theme]
  );

  return (
    <div className="preference_box sizer">
      <DateButton
        date={date}
        width="100%"
        onChange={(date) => setDate(dayjs.utc(date).toDate().toUTCString())}
      />

      <AutocompleteSearch
        setAddress={setAddress}
        placeholder="Address"
        address={address}
        value={address}
        width="100%"
      />

      <Select
        isMulti
        closeMenuOnSelect={false}
        styles={selectStyles}
        options={timeSlots}
        className="my-select"
        classNamePrefix="custom-select"
        placeholder="Choose a time"
        value={timeSlots.filter((slot) => times.includes(slot.value))}
        hideSelectedOptions={false}
        components={{
          ValueContainer: CustomValueContainer,
          ClearIndicator: CustomClearIndicator
        }}
        onChange={(selected) => setTimes(selected.map((s) => s.value))}
      />

      <button
        className={pickleball ? 'pickle-true' : 'pickle-false'}
        style={{
          width: '100%',
          height: isMobile ? '40px' : '39px',
          fontSize: isMobile ? '20px' : '15px'
        }}
        onClick={() => setPickleball(!pickleball)}
      >
        Pickleball
      </button>
    </div>
  );
}
