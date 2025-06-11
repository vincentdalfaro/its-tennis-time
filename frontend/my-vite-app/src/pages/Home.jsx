import '../App.css';
import { useState, useEffect, useRef} from "react";
import Topbar from '../components/Topbar.jsx'
import Select from 'react-select';
import calender_white from '../assets/calender-white.png';
import calender_black from '../assets/calender-black.png';
import SelectStyle from '../styles/SelectStyle.jsx';
import HoverButton from '../components/HoverButton.jsx';

export default function Home() { 

  const options = [
    { value: 'Morning', label: 'morning' },
    { value: 'Afternoon', label: 'afternoon' },
    { value: 'Evening', label: 'evening' },
  ];
  
  const [address, setAddress] = useState('');
  const [dates, setDates] = useState([])


  {/* Sets Address */}
  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  {/* Sets Dates */}
  const addDates = (selected) => {
    setDates(selected);
  };


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
  <div>
    <Topbar/>
    <div className = "home-flex">

      <text class = "white-text" style={{ marginTop: "100px", fontSize: "30px"}}> Find a Court</text>
      <div className='home-flex-2'>
        
        {/* Address Input */}
        <input
          type="text"
          className="input"
          style={{width: "300px"}}
          onChange={handleChange}
          placeholder = "Address"
          value = {address}
        />

        {/* Date Button}*/}
        <HoverButton
          defaultImg={calender_white}
          hoverImg={calender_black}
        >
          Date
        </HoverButton>

        {/* Time Select */}
        <Select
          isMulti
          styles={SelectStyle}
          options={options}
          className = "my-select"
          classNamePrefix="custom-select"
          placeholder="Time of Day"
          value={dates}
          onChange={addDates}
        />

        {/* Submit Button */}
        <button className = "button" style={{width: "100px"}} >
          Search
        </button>
          
      </div>

    </div>
  </div>
);
}