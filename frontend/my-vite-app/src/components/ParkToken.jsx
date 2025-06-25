import dayjs from "dayjs";
import tennisCourt from "../assets/icons-white/tennis-court.png"
import icon from "../assets/icons-white/neighborhood.png"
import toiletIcon from "../assets/icons-white/toilet.png"
import lightsIcon from "../assets/icons-white/lights.png"
import TimeButtons from "./TimeButtons.jsx"

function ParkToken({ place, index, pickleball, address }) {

    

    const allTimes = Array.from(new Set(
    (place.courts || [])
        .flatMap(court => court.availableTimes)
        .filter(Boolean) // remove nulls/undefined
    )).sort((a, b) => a.localeCompare(b));

    function handleClick() {
        const url = `https://www.rec.us/locations/` + place["locationId"];
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
            }}>

                {place.name}

                {address && place?.distance?.distance_text && (
                <div style={{ fontSize: "15px", marginLeft: "auto", marginRight: "10px" }}>
                    {place.distance.distance_text}
                </div>
                )}

            </div>

            <div className="white-box" style = {{fontSize: "18px"}}> 
                <div className="white-text" style = {{marginLeft:"20px", marginRight: "20px", display: "flex", alignItems: "center"}}>

                    <img src={icon} 
                        style={{height: "20px", width: "auto", marginRight: "5px"}}/>
                    
                    {place["neighborhood"]}
                    <img src={tennisCourt} 
                        style={{height: "20px", width: "auto", marginLeft: "25px", marginRight: "5px"}}/>
                        {place.numCourts}

                        {pickleball ? place["reservable_pickle"] : place["reservable_tennis"]}
                    
                    {place.restrooms && 
                        <img 
                            src={toiletIcon} 
                            style={{ height: "20px", width: "auto", marginLeft: "25px", marginRight: "5px" }} />
                    }

                    {place.lights && 
                        <img 
                            src={lightsIcon} 
                            style={{ height: "20px", width: "auto", marginLeft: "15px"}} />
                    }
                </div>

                <TimeButtons allTimes={allTimes} handleClick = {handleClick}/>
                
            </div>
        </div>
  );
}

export default ParkToken;
