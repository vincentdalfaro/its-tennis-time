import Calendar from "./Calendar.jsx";
import calendarWhite from '../../assets/calendar-white.png';
import calendarBlack from '../../assets/calendar-black.png';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useState, useRef, useEffect } from "react";

dayjs.extend(utc);

export default function DateButton({ width, date: rawDate, onChange }) {

  {/* Variables used for Calendar Style*/}
  const [isHovered, setIsHovered] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const wrapperRef = useRef(null);

  const date = dayjs.utc(rawDate);
  const imgSrc = (isHovered || calendarOpen) ? calendarBlack : calendarWhite;

  {/* Handles Calendar Open/Close */}
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
      style={{ position: "relative", display: "inline-block", width }}
    >

      {/* Formats Button/Style */}
      <button
        className={`button button-calendar ${calendarOpen ? 'calendar-open' : ''}`}
        style={{ width: "100%" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setCalendarOpen(prev => !prev)}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={imgSrc} alt="calendar icon" style={{ width: "20px", marginRight: "5px" }} />
          {date.format("YYYY-MM-DD")}
        </div>
      </button>

      {/* Handles Calendar Open/Close */}
      {calendarOpen && (
        <div className="calendar-style">
          <Calendar
            value={date}
            onChange={(newDate) => {
              onChange(newDate);
              setCalendarOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
