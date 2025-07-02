{/* External Libraries*/}
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import Select from 'react-select';
import { Link } from 'react-router-dom';

import '../App.css';

{/* Components */}
import AutocompleteSearch from '../components/Autocomplete.jsx';
import CustomValueContainer from '../components/select/CustomValueContainer.jsx';
import DateButton from '../components/calendar/DateButton.jsx';
import SelectStyle from '../components/select/SelectStyle.jsx';
import Topbar from '../components/Topbar.jsx';
import useTheme from '../components/ThemeObserver.jsx';

import { timeSlots } from '../constants/TimeSlots.jsx';

export default function Home() { 

  {/* Sets the theme for the website */}
  const theme = useTheme()
  
  {/* Values */}
  const [address, setAddress] = useState('');
  const [times, setTimes] = useState([])
  const [date, setDate] = useState(dayjs());

  {/* Creating a query for the URL */}
  const query = new URLSearchParams({
    address: address,
    date: date,
    times: times.join(','),
  }).toString();

  {/* Adjusts select based on theme*/}
  const selectStyles = useMemo(() => SelectStyle({ width: 300, theme }), [theme]);
  
  return (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

    <Topbar/>

    <div className = "home-flex">

      <div style={{ marginTop: "100px", fontSize: "30px" }}>
        Find a Court
      </div>
      
      <div className='home-flex-2'>

        {/* Autocomplete for address input */}
        <AutocompleteSearch 
          setAddress = {setAddress} 
          placeholder={"Address"}
          address={address}
          width = "300px"
        />

        {/* Date Selection */}
        <DateButton 
          selectedDate={date}
          width = "300px"
          onChange={(newDate) => setDate(newDate)} 
        />


        {/* Time Select */}
        <Select
          isMulti
          styles={selectStyles}
          options={timeSlots}
          className = "my-select"
          classNamePrefix="custom-select"
          placeholder="Time"
          value={timeSlots.filter(slot => times.includes(slot.value))}
          hideSelectedOptions={false}
          components={{ ValueContainer: CustomValueContainer }}
          onChange={(selected) => setTimes(selected.map(s => s.value))}
          closeMenuOnSelect={false}
        />

        {/* Submit Button */}
        <Link
          to={`/map?${query}`}
          className="button white-text submit-button"
        >
          Search
        </Link>
  
      </div>

    </div>
  </div>
);
}