import { useState } from 'react';
import dayjs from 'dayjs';
import downCaret from '../assets/icons-white/down-arrow.png'
import upCaret from '../assets/icons-white/up-arrow.png'

export default function TimeButtons({ allTimes, handleClick}) {
  const [expanded, setExpanded] = useState(false);

  const visibleTimes = expanded ? allTimes : allTimes.slice(0, 3);

  return (
    <div className={expanded ? "times-expand" : "times-scroll"}>

      {/* Each Park's Reservations displayed in accordance to expanded boolean */}
      {visibleTimes.map((time, i) => (
        <button
          key={i}
          className="reservation-button"
          style={allTimes.length === 1 ? { gridRowStart: 2 } : {}}
          onClick={handleClick}
        >
          {dayjs(time).format('h:mm A')}
        </button>
      ))}

      {/* Down Caret to expand */}
      {!expanded && allTimes.length > 3 && (
        <button onClick={() => setExpanded(true)} className="expand-button">
          <img src = {downCaret} style = {{width: "15px"}}/>
        </button>
      )}

      {/* Up Caret to Minimize*/}
      {expanded && (
        <button onClick={() => setExpanded(false)} className="expand-button">
          <img src = {upCaret} style = {{width: "15px"}}/>
        </button>
      )}

    </div>
  );
}
