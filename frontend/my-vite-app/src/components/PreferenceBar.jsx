import '../App.css';
import Select from 'react-select';
import { useMemo } from 'react';
import SelectStyle from './select/SelectStyle.jsx';
import DateButton from './calendar/DateButton.jsx';
import AutocompleteSearch from '../components/Autocomplete.jsx'
import dayjs from 'dayjs';
import CustomValueContainer from './select/CustomValueContainer.jsx'
import CustomClearIndicator from './select/CustomClear.jsx';
import useTheme from "../components/ThemeObserver.jsx";

export default function ({address, setAddress, date, setDate, times, setTimes, pickleball, setPickleball}) {

    const theme = useTheme()
    const selectStyles = useMemo(() => SelectStyle({ width: 282 , theme }), [theme]);

    {/* Different available time frames*/}
    const timeSlots = [
        { value: 'Morning', label: 'Morning' },
        { value: 'Afternoon', label: 'Afternoon' },
        { value: 'Evening', label: 'Evening' },
    ];

    return (
        <div className = "preference_box" style={{display: "flex"}}>

            {/* Date Selection */}
            <DateButton 
                date={date} // assuming date is ISO string or UTC string
                width="140px"
                onChange={(date) => setDate(dayjs.utc(date).toDate().toUTCString())}
            />

            {/* Autocomplete for address input */}
            <AutocompleteSearch 
                setAddress = {setAddress} 
                placeholder={"Address"}
                address = {address}
                value = {address}
                width = {"243px"}
            />

             {/* Time Slot Selections*/}
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

            {/* Pickleball Selection */}
            <button 
                className={pickleball ? 'pickle-true' : 'pickle-false'}
                onClick={() => setPickleball(!pickleball)}
            > 
                Pickleball 

            </button>   

        </div>
    )
}