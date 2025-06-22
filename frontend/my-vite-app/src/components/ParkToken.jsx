import dayjs from "dayjs";
import tennisCourt from "../assets/tennis-court.png"
import icon from "../assets/icon.png"


function ParkToken({ place, index, listItemRefs, pickleball }) {

    const allTimes = Array.from(new Set(
  (place.courts || [])
    .flatMap(court => court.availableTimes)
    .filter(Boolean) // remove nulls/undefined
)).sort((a, b) => a.localeCompare(b));

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
                <div className="white-text" style = {{marginLeft:"20px", marginRight: "20px", display: "flex", alignItems: "center"}}>

                    <img src={icon} 
                        style={{height: "20px", width: "auto", marginRight: "5px"}}/>
                    
                    {place["neighborhood"]}
                    <img src={tennisCourt} 
                        style={{height: "20px", width: "auto", marginLeft: "50px", marginRight: "5px"}}/>
                        {place.numCourts}

                        {pickleball ? place["reservable_pickle"] : place["reservable_tennis"]}

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
