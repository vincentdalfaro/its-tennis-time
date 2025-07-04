import tennisCourtWhite from "../../assets/icons-white/tennis-court-white.png";
import tennisCourtBlack from "../../assets/icons-black/tennis-court-black.png";
import neighborhoodIconWhite from "../../assets/icons-white/neighborhood-icon-white.png";
import neighborhoodIconBlack from "../../assets/icons-black/neighborhood-icon-black.png";
import toiletIconWhite from "../../assets/icons-white/toilet-white.png";
import toiletIconBlack from "../../assets/icons-black/toilet-black.png";
import lightsIconWhite from "../../assets/icons-white/lights-white.png";
import lightsIconBlack from "../../assets/icons-black/lights-black.png";
import TimeButtons from "./TimeButtons.jsx";
import useTheme from "../ThemeObserver.jsx";

import { useState } from "react"; // ADD THIS AT THE TOP

function ParkToken({ place, index, pickleball, address }) {
  const theme = useTheme();
  const isDark = theme === 'dark';

  const [expanded, setExpanded] = useState(false); // ADD THIS

  const allTimes = Array.from(new Set(
    (place.courts || [])
      .flatMap(court => court.availableTimes)
      .filter(Boolean)
  )).sort((a, b) => a.localeCompare(b));

  function handleClick() {
    const url = `https://www.rec.us/locations/${place["locationId"]}`;
    window.open(url, '_blank');
  }

  function toggleSummary() {
    setExpanded(prev => !prev);
  }

  return (
    <div>
      {/* Title & Distance */}
      <div
        style={{
          fontSize: "50px",
          display: "flex",
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <div style={{ flex: 1 }}>
          {place.name}
        </div>
        {address && place?.distance?.distance_text && (
          <div style={{ fontSize: "15px", marginTop: "auto", marginBottom: "10px" }}>
            {place.distance.distance_text}
          </div>
        )}
      </div>

      {/* Details Box */}
      <div className="white-box" style={{ fontSize: "18px" }}>
        <div style={{ marginLeft: "20px", marginRight: "20px", display: "flex", alignItems: "center" }}>
          <img src={isDark ? neighborhoodIconWhite : neighborhoodIconBlack} style={{ height: "20px", marginRight: "5px" }} />
          {place["neighborhood"]}

          <img src={isDark ? tennisCourtWhite : tennisCourtBlack} style={{ height: "20px", marginLeft: "25px", marginRight: "5px" }} />
          {place.numCourts}

          {pickleball ? place["reservable_pickle"] : place["reservable_tennis"]}

          {place.restrooms &&
            <img src={isDark ? toiletIconWhite : toiletIconBlack} style={{ height: "20px", marginLeft: "25px", marginRight: "5px" }} />
          }

          {place.lights &&
            <img src={isDark ? lightsIconWhite : lightsIconBlack} style={{ height: "20px", marginLeft: "15px" }} />
          }
        </div>

        <div
            className={`summary-style ${expanded ? 'expanded' : ''}`}
            onClick={toggleSummary}
        >
            {place.summary}
        </div>

        <div style={{ flexShrink: 0 }}>
         <TimeButtons allTimes={allTimes} handleClick={handleClick} theme={theme} />
        </div>
      </div>
    </div>
  );
}


export default ParkToken;
