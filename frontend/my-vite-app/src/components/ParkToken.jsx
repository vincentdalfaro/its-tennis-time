import dayjs from "dayjs";
import { useState } from "react";




function ParkToken({ place, index, listItemRefs }) {

    const allTimes = (place.courts || [])
    .flatMap(court => court.availableTimes)
    .filter(Boolean) // remove nulls/undefined if any
    .sort((a, b) => a.localeCompare(b)); // assuming times are in "HH:MM" format

    console.log(place["locationId"])

    function handleClick() {
        const url = `https://www.rec.us/locations/` + place["locationId"];
        console.log(url)
        window.open(url, '_blank');
    }

    return (
        <div>
            <div
            className="white-text"
            style={{
                fontSize: "50px",
                display: "flex",
                alignItems: 'baseline',
            }}
            >

                {place.name}

                {place?.distance?.distance_text && (
                <div style={{ fontSize: "15px", marginLeft: "auto", marginRight: "10px" }}>
                    {place.distance.distance_text}
                </div>
                )}

            </div>

            <div className="white-box" style = {{fontSize: "20px"}}> 
                <div className="white-text" style = {{marginLeft:"20px", marginRight: "20px", marginTop:"80px"}}>
                    When he was nearly thirteen, my brother Jem got his arm badly broken at the
                    elbow. When it healed, and Jem’s fears of never being able to play football were
                    assuaged, he was seldom self-conscious about his injury. Blah blah blah blah blah blah
                    Blah blah
                </div>

                <div className="scroll-wrapper">    
                    <div className="time-flex">
                    {allTimes.map((time, i) => (
                        <button
                        key={i}
                        onClick = {handleClick}
                        className="reservation-button"
                        style={allTimes.length === 1 ? { gridRowStart: 2 } : {}}
                        >
                        {dayjs(time).format('h:mm A')}
                        </button>
                    ))}
                    </div>
                </div>
            </div>
        </div>
  );
}

export default ParkToken;
