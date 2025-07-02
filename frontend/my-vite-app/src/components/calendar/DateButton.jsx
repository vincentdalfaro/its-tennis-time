import calendarWhite from '../../assets/icons-white/calendar-white.png';
import calendarBlack from '../../assets/icons-black/calendar-black.png';
import { useState, useRef, useEffect } from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Calendar from "./Calendar.jsx";

dayjs.extend(utc);

export default function DateButton({ width, date: rawDate, onChange }) {
  const [isHovered, setIsHovered] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const wrapperRef = useRef(null);

  const date = dayjs.utc(rawDate);

  useEffect(() => {
    // Set initial theme
    setTheme(document.documentElement.getAttribute('data-theme') || 'light');

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  // Decide which icon to show based on theme AND hover/open states
  const imgSrc =
    theme === 'dark'
    ? (isHovered || calendarOpen ? calendarBlack : calendarWhite)  // dark theme: hovered=black, not hovered=white
    : (isHovered || calendarOpen ? calendarWhite : calendarBlack);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", display: "inline-block", width}}
    >
      <button
        className={`button ${calendarOpen ? 'calendar-open' : ''}`}
        style={{ width: "100%" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setCalendarOpen((prev) => !prev)}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={imgSrc} alt="calendar icon" style={{ width: "20px", marginRight: "5px" }} />
          {date.format("YYYY-MM-DD")}
        </div>
      </button>

      {calendarOpen && (
        <div className="calendar-style">
          <Calendar
            value={date}
            onChange={(newDate) => {
              onChange(newDate);
              setCalendarOpen(false);
            }}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}