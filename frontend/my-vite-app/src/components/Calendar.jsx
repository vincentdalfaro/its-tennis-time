import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calendar({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{
          transformOrigin: 'top left',
          width: 'max-content',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
        }}
      >
        <DateCalendar
        value={value}
        onChange={onChange}
        sx={{
            fontFamily: 'Futura, Arial, sans-serif',

            '& .MuiPickersCalendarHeader-label': {
            fontFamily: 'Futura, Arial, sans-serif',
            },

            '& .MuiPickersCalendar-weekDayLabel': {
            fontFamily: 'Futura, Arial, sans-serif',
            },

            '& .MuiPickersDay-root': {
            fontFamily: 'Futura, Arial, sans-serif',
            },

            '& .MuiPickersDay-root.Mui-selected': {
            backgroundColor: 'black',
            color: 'white',
            fontFamily: 'Futura, Arial, sans-serif',
            '&:hover, &:focus': {
                backgroundColor: 'black',
            },
            },
        }}
        />
      </div>
    </LocalizationProvider>
  );
}
