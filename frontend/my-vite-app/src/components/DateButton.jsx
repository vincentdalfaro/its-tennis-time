import React, { useRef, useState, useEffect } from "react";
import Calendar from "./Calendar.jsx";
import calendarWhite from '../assets/calendar-white.png';
import calendarBlack from '../assets/calendar-black.png';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default function DateButton({ width, date, onChange }) {
  const [isHovered, setIsHovered] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const wrapperRef = useRef(null);

  
  date = dayjs.utc(date);
  const isActive = isHovered || calendarOpen;

  const imgSrc = isActive ? calendarBlack : calendarWhite;

  const closeCalendar = () => {
    setCalendarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeCalendar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setCalendarOpen(prev => !prev);
  };
  
  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", display: "inline-block", width }}
    >
      <button
        className={`button button-calendar ${calendarOpen ? 'calendar-open' : ''}`}
        style={{ width: "100%"}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleToggle}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={imgSrc}
            alt="calendar icon"
            style={{ width: "20px", marginRight: "5px" }}
          />
            {date.format("YYYY-MM-DD")}
        </div>
      </button>

      {calendarOpen && (
        <div className="calendar-style">
          <Calendar
            value={date}
            onChange={(date) => {
              onChange(date);
              closeCalendar();
            }}
          />
        </div>
      )}
    </div>
  );
}
