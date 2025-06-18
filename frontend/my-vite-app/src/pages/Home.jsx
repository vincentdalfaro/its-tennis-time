import '../App.css';
import { useState} from "react";
import Topbar from '../components/Topbar.jsx'
import Select from 'react-select';
import SelectStyle from '../components/select/SelectStyle.jsx';
import DateButton from '../components/DateButton.jsx';
import AutocompleteSearch from '../components/Autocomplete.jsx'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import CustomValueContainer from '../components/select/CustomValueContainer.jsx'


export default function Home() { 

  {/* Different available time frames*/}
  const timeSlots = [
    { value: 'Morning', label: 'Morning' },
    { value: 'Afternoon', label: 'Afternoon' },
    { value: 'Evening', label: 'Evening' },
  ];
  
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

  return (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

    <Topbar/>

    <div className = "home-flex">

      <div className="white-text" style={{ marginTop: "100px", fontSize: "30px" }}>
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
          styles={SelectStyle(300)}
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