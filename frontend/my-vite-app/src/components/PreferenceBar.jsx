import '../App.css';
import { useState} from "react";
import Select from 'react-select';
import SelectStyle from './select/SelectStyle.jsx';
import DateButton from '../components/DateButton.jsx';
import AutocompleteSearch from '../components/Autocomplete.jsx'
import dayjs from 'dayjs';
import CustomValueContainer from './select/CustomValueContainer.jsx'

export default function ({address, setAddress, date, setDate, times, setTimes}) {

    {/* Different available time frames*/}
    const timeSlots = [
        { value: 'Morning', label: 'Morning' },
        { value: 'Afternoon', label: 'Afternoon' },
        { value: 'Evening', label: 'Evening' },
    ];
    
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
                onChange={(newDate) => setDate(dayjs(newDate).toDate().toUTCString())}
            />
            
            {/* Time Slot Selections*/}
            <Select
                isMulti
                styles={SelectStyle(300)}
                options={timeSlots}
                className = "my-select"
                classNamePrefix="custom-select"
                placeholder="Choose a time"
                value={timeSlots.filter(slot => times.includes(slot.value))}
                hideSelectedOptions={false}
                components={{ ValueContainer: CustomValueContainer }}
                onChange={(selected) => setTimes(selected.map(s => s.value))}
            />
            
        </div>
    )
}