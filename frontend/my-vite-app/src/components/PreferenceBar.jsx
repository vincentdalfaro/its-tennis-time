import '../App.css';
import Select from 'react-select';
import SelectStyle from './select/SelectStyle.jsx';
import DateButton from './calendar/DateButton.jsx';
import AutocompleteSearch from '../components/Autocomplete.jsx'
import dayjs from 'dayjs';
import CustomValueContainer from './select/CustomValueContainer.jsx'
import CustomClearIndicator from './select/CustomClear.jsx';
import settingsIcon from '../assets/settings-icon.png'
import xButton from '../assets/x-button.png'
import { useState } from 'react';

export default function ({address, setAddress, date, setDate, times, setTimes, pickleball, setPickleball}) {

    {/* Different available time frames*/}
    const timeSlots = [
        { value: 'Morning', label: 'Morning' },
        { value: 'Afternoon', label: 'Afternoon' },
        { value: 'Evening', label: 'Evening' },
    ];

    const [clicked, setClicked] = useState(true)

    function isClicked(){
        setClicked(prev => !prev);
    }

    return (
        <div className = "preference_box" style={{display: "flex"}}>

            {/* Date Selection */}
            <DateButton 
                date={date} // assuming date is ISO string or UTC string
                width="140px"
                onChange={(date) => setDate(dayjs.utc(date).toDate().toUTCString())}
            />

             {/* Time Slot Selections*/}
            <Select
                isMulti
                closeMenuOnSelect={false}
                styles={SelectStyle(285)}
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


            {/* Autocomplete for address input */}
            <AutocompleteSearch 
                setAddress = {setAddress} 
                placeholder={"Address"}
                address = {address}
                value = {address}
                width = {"275px"}
            />

            {/* Pickleball Selection */}
            <button 
                className={pickleball ? 'pickle-true' : 'pickle-false'}
                onClick={() => setPickleball(!pickleball)}
            > 
                Pickleball 

            </button>

            {!clicked && 
                <div style =  {{'color': "white"}}>This only shows if isVisible is true</div>
            
            }
            
            <button style = {{background: "transparent", border: "none", marginLeft: "1px"}} onClick = {isClicked}>
                {clicked ? 
                <img src={settingsIcon} style = {{width:"25px"}}/>: 
                <img src = {xButton} style = {{width: "20px", borderLeft: "5px solid black"}}/>}
            </button>
            

        </div>
    )
}