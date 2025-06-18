import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from "dayjs";

{/* font, converting to a dayjs variable for Calendar, and Calendar window*/}
const FONT_FAMILY = 'Futura, Arial, sans-serif';
const today = dayjs();
const maxDate = today.add(6, 'day');

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
        {/* Calendar Popup Style */}
        <DateCalendar
          value={value}
          onChange={onChange}
          shouldDisableDate={(date) =>
            date.isBefore(today, 'day') || date.isAfter(maxDate, 'day')
          }
          showDaysOutsideCurrentMonth
          sx={{
            fontFamily: FONT_FAMILY,
            '& .MuiPickersCalendarHeader-label': { fontFamily: FONT_FAMILY },
            '& .MuiPickersCalendar-weekDayLabel': { fontFamily: FONT_FAMILY },
            '& .MuiPickersDay-root': { fontFamily: FONT_FAMILY },
            '& .MuiPickersDay-root.Mui-selected': {
              backgroundColor: 'black',
              color: 'white',
              fontFamily: FONT_FAMILY,
              '&:hover, &:focus': { backgroundColor: 'black' },
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
}
