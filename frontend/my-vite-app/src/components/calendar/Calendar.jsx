import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from "dayjs";
import useTheme from "../ThemeObserver.jsx";

const FONT_FAMILY = 'Futura, Arial, sans-serif';
const today = dayjs().startOf('day');
const maxDate = today.add(7, 'day');

export default function Calendar({ value, onChange }) {
  const theme = useTheme();             // ✅ call the hook
  const isDark = theme === 'dark';      // ✅ use theme dynamically

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{
          transformOrigin: 'top left',
          backgroundColor: isDark ? '#222' : '#f0f0f0',
          borderRadius: '8px',
        }}
      >
        <DateCalendar
          value={value}
          onChange={onChange}
          shouldDisableDate={(date) =>
            date.isBefore(today, 'day') || date.isAfter(maxDate, 'day')
          }
          showDaysOutsideCurrentMonth
          sx={{
            fontFamily: FONT_FAMILY,
            color: isDark ? '#eee' : '#222',
            '& .MuiPickersCalendarHeader-label': {
              fontFamily: FONT_FAMILY,
              color: isDark ? '#eee' : '#222',
            },
            '& .MuiPickersCalendar-weekDayLabel': {
              fontFamily: FONT_FAMILY,
              color: isDark ? '#aaa' : '#666',
            },
            '& .MuiPickersDay-root': {
              fontFamily: FONT_FAMILY,
              color: isDark ? '#ddd' : '#444',
            },
            '& .MuiPickersDay-root.Mui-selected': {
              backgroundColor: isDark ? '#eee' : 'black',
              color: isDark ? 'black' : 'white',
              fontFamily: FONT_FAMILY,
              '&:hover, &:focus': {
                backgroundColor: isDark ? '#ddd' : 'black',
              },
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
}
