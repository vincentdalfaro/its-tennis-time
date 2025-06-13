import '../App.css';
import { useState, useEffect, useRef} from "react";
import Topbar from '../components/Topbar.jsx'
import Select from 'react-select';
import calender_white from '../assets/calender-white.png';
import calender_black from '../assets/calender-black.png';
import SelectStyle from '../styles/SelectStyle.jsx';
import DateButton from '../components/DateButton.jsx';
import AutocompleteSearch from '../components/Autocomplete.jsx'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';


export default function Home() { 

  const options = [
    { value: 'Morning', label: 'morning' },
    { value: 'Afternoon', label: 'afternoon' },
    { value: 'Evening', label: 'evening' },
  ];
  
  const [address, setAddress] = useState('');
  const [times, setTimes] = useState([])
  const buttonRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  {/* Sets Dates */}
  const addTimes = (selected) => {
    setTimes(selected);
  };

const query = new URLSearchParams({
  address: address,
  date: selectedDate,
  times: times.map(t => t.value).join(','),
}).toString();


  {/* Date Selector Icon */}
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsClicked(false);
      setImgSrc(calender_white);
    }
  };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

    <Topbar/>

    <div className = "home-flex">

      <div className="white-text" style={{ marginTop: "100px", fontSize: "30px" }}>
        Find a Court
      </div>
      
      <div className='home-flex-2'>

        {/* Autocomplete for address input */}
        <AutocompleteSearch setAddress = {setAddress}/>

        {/* Date Selection */}
        <DateButton defaultImg={calender_white} 
          hoverImg={calender_black} 
          selectedDate={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)} 
        />

        {/* Time Select */}
        <Select
          isMulti
          styles={SelectStyle}
          options={options}
          className = "my-select"
          classNamePrefix="custom-select"
          placeholder="Time of Day"
          value={times}
          onChange={addTimes}
        />

        {/* Submit Button */}
        <Link
          to={`/map?${query}`}
          className="button white-text"
          style={{ width: '100px', fontFamily: 'Futura', fontSize: '16px', display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
        >
          Search
        </Link>
        
          
      </div>

    </div>
  </div>
);
}