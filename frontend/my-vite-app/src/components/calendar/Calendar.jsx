import { useMemo } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from "dayjs";
import useTheme from "../ThemeObserver.jsx";

const FONT_FAMILY = 'Futura, Arial, sans-serif';
const today = dayjs().startOf('day');
const maxDate = today.add(7, 'day');

export default function Calendar({ value, onChange }) {
  const theme = useTheme();
  const isDark = theme === 'dark';

  // Memoize styles so the object reference only changes when isDark changes
  const calendarStyles = useMemo(() => ({
    fontFamily: FONT_FAMILY,

    color: isDark ? '#000' : '#fff',  // Main text color

    '& .MuiPickersCalendarHeader-label': {
      fontFamily: FONT_FAMILY,
      color: isDark ? '#000' : '#fff',
    },

    '& .MuiDayCalendar-weekDayLabel': {
      fontFamily: FONT_FAMILY,
      color: isDark ? '#000' : '#999',
      opacity: 1,
    },

    '& .MuiPickersCalendarHeader-switchViewButton, & .MuiPickersArrowSwitcher-button': {
      color: isDark ? '#000' : '#fff', // nav buttons white in light mode
    },

    '& .MuiPickersDay-root': {
      fontFamily: FONT_FAMILY,
      color: isDark ? '#222' : '#eee', // day numbers white-ish in light mode
    },

    '& .MuiPickersDay-root.Mui-selected': {
      backgroundColor: isDark ? '#000' : '#fff',
      color: isDark ? '#fff' : '#000',
      fontFamily: FONT_FAMILY,
      '&:hover, &:focus': {
        backgroundColor: isDark ? '#222' : '#eee',
      },
    },

    '& .MuiPickersDay-root.Mui-disabled': {
      color: '#888 !important',
      pointerEvents: 'none',
      opacity: 0.5,
    },

    '& input::placeholder': {
      color: isDark ? '#bbb' : '#aaa',
      opacity: 1,
    },
  }), [isDark]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{
          transformOrigin: 'top left',
          backgroundColor: isDark ? '#fff' : '#000',  // white bg for dark mode, black bg for light mode
          borderRadius: '8px',
          padding: 8,
        }}
      >
        <DateCalendar
          key={isDark ? 'dark' : 'light'}  // force remount when theme changes
          value={value}
          onChange={onChange}
          shouldDisableDate={(date) =>
            date.isBefore(today, 'day') || date.isAfter(maxDate, 'day')
          }
          showDaysOutsideCurrentMonth
          sx={calendarStyles}
        />
      </div>
    </LocalizationProvider>
  );
}
