import '../App.css';
import { useState } from "react";
import Topbar from '../components/Topbar.jsx'
import Select from 'react-select';
import calender_white from '../assets/calender-white.png';
import calender_black from '../assets/calender-black.png';
import SelectStyle from '../components/Styles.jsx';

export default function Home() { 

  const options = [
    { value: 'Morning', label: 'morning' },
    { value: 'Afternoon', label: 'afternoon' },
    { value: 'Evening', label: 'evening' },
  ];

  const [imgSrc, setImgSrc] = useState(calender_white);

  return (
  <div>
    <Topbar/>
    <div className = "flex-vertical" style={{marginTop: "150px"}}>
      <div className='flex-vertical-2'>
        <input
          type="text"
          className="input"
          style={{ marginTop: "100px", width: "300px", color: "#999999"}}
          value = "Address"
        />

        <button 
          className = "button" 
          style={{width: "300px", color: "#999999"}}
          onMouseEnter={() => setImgSrc(calender_black)}
          onMouseLeave={() => setImgSrc(calender_white)}
        >
          <div style = {{display: "flex", alignContent: "flex-start"}}>
            <img src={imgSrc} alt="calendar icon" style={{ width: '20px', marginRight: "5px" }} />
            Time
          </div>
        </button>

        <Select
          isMulti
          styles={SelectStyle}
          options={options}
          classNamePrefix="custom-select"
          placeholder="Time of Day"
        />

        <button className = "button" style={{width: "100px", color: "white"}}>
          Search
        </button>
      </div>

    </div>
  </div>
);
}