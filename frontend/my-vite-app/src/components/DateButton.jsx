import React, { useRef, useState, useEffect } from "react";
import Calendar from "./Calendar";
import calender_white from '../assets/calender-white.png';
import calender_black from '../assets/calender-black.png';
import dayjs from 'dayjs'

export default function DateButton({
  width,
  style = {},
  selectedDate,
  onChange,
}) {
  const [imgSrc, setImgSrc] = useState(calender_white);
  const [isClicked, setIsClicked] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setCalendarOpen(false);
        setIsClicked(false);
        setImgSrc(calender_white);
        setHovered(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calender_white]);

  const date = dayjs(selectedDate);

  const handleClick = () => {
    setIsClicked(true);
    setImgSrc(calender_black);
    setCalendarOpen((open) => !open);
  };

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", display: "inline-block", width }}
    >
      <button
        ref={buttonRef}
        className="button"
        style={{ width: "100%", color: "#999999", ...style }}
        onMouseEnter={() => {
          setImgSrc(calender_black);
          setHovered(true);
        }}
        onMouseLeave={() => {
          if (!isClicked) setImgSrc(calender_white);
          setHovered(false);
        }}
        onClick={handleClick}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={imgSrc}
            alt="icon"
            style={{ width: "20px", marginRight: "5px" }}
          />
          <p
            className="white-text"
            style={{
              marginLeft: "10px",
              margin: 0,
              color: hovered || calendarOpen ? "black" : "white",
              transition: "color", // ✨ Smooth color fade
            }}
          >
            {dayjs(date).format("YYYY-MM-DD")}
          </p>
        </div>
      </button>

      {calendarOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 2,
            backgroundColor: "#f0f0f0",
            borderRadius: 8,
            marginTop: 6,
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            transform: "scale(0.9)",
            transformOrigin: "top left",
          }}
        >
          <Calendar
            value={date}
            onChange={(newDate) => {
              onChange(newDate); // pass updated date to parent
              setCalendarOpen(false);
              setIsClicked(false);
              setImgSrc(calender_white);
            }}
          />
        </div>
      )}
    </div>
  );
}