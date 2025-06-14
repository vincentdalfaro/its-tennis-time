import '../App.css';
import { useState} from "react";
import Select from 'react-select';
import SelectStyle from './select/SelectStyle.jsx';
import DateButton from '../components/DateButton.jsx';
import AutocompleteSearch from '../components/Autocomplete.jsx'
import dayjs from 'dayjs';
import CustomValueContainer from './select/CustomValueContainer.jsx'

export default function () {

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

    {/* Sets Dates */}
    const addTimes = (selected) => {
    setTimes(selected);
    };
    
    return (
       <div className = "preference_box" style={{display: "flex"}}>

            {/* Autocomplete for address input */}
            <AutocompleteSearch 
            setAddress = {setAddress} 
            placeholder={"Address"}
            width = "200px"
            />

            {/* Date Selection */}
            <DateButton 
            selectedDate={date}
            width = "140px"
            onChange={(newDate) => setDate(newDate)} 
            />
            
            {/* Time Slot Selections*/}
            <Select
            isMulti
            styles={SelectStyle(300)}
            options={timeSlots}
            className = "my-select"
            classNamePrefix="custom-select"
            placeholder="Choose a time"
            value={times}
            hideSelectedOptions={false}
            components={{ ValueContainer: CustomValueContainer }}
            onChange={addTimes}
            />


        </div>
    )
}