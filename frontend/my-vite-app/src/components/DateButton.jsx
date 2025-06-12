import React, { useRef, useState, useEffect } from "react";
import Calendar from "./Calendar";

export default function DateButton({
  defaultImg,
  hoverImg,
  width = "300px",
  style = {},
  selectedDate,
  onChange,
}) {
  const [imgSrc, setImgSrc] = useState(defaultImg);
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
        setImgSrc(defaultImg);
        setHovered(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [defaultImg]);

  const handleClick = () => {
    setIsClicked(true);
    setImgSrc(hoverImg);
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
          setImgSrc(hoverImg);
          setHovered(true);
        }}
        onMouseLeave={() => {
          if (!isClicked) setImgSrc(defaultImg);
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
            {selectedDate.format("YYYY-MM-DD")}
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
            value={selectedDate}
            onChange={(newDate) => {
              onChange(newDate); // pass updated date to parent
              setCalendarOpen(false);
              setIsClicked(false);
              setImgSrc(defaultImg);
            }}
          />
        </div>
      )}
    </div>
  );
}