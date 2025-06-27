import tennisCourtWhite from "../assets/icons-white/tennis-court-white.png"
import tennisCourtBlack from "../assets/icons-black/tennis-court-black.png"
import neighborhoodIconWhite from "../assets/icons-white/neighborhood-icon-white.png"
import neighborhoodIconBlack from "../assets/icons-black/neighborhood-icon-black.png"
import toiletIconWhite from "../assets/icons-white/toilet-white.png"
import toiletIconBlack from "../assets/icons-black/toilet-black.png"
import lightsIconWhite from "../assets/icons-white/lights-white.png"
import lightsIconBlack from "../assets/icons-black/lights-black.png"
import TimeButtons from "./TimeButtons.jsx"
import useTheme from "./ThemeObserver.jsx";

function ParkToken({ place, index, pickleball, address }) {

    
    const theme = useTheme()
    const isDark = theme === 'dark'

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

            <div className="white-box" style = {{fontSize: "18px"}}> 
                <div className="white-text" style = {{marginLeft:"20px", marginRight: "20px", display: "flex", alignItems: "center"}}>

                    <img src={isDark ? neighborhoodIconWhite: neighborhoodIconBlack} 
                        style={{height: "20px", width: "auto", marginRight: "5px"}}/>
                    
                    {place["neighborhood"]}
                    <img src={isDark ? tennisCourtWhite: tennisCourtBlack} 
                        style={{height: "20px", width: "auto", marginLeft: "25px", marginRight: "5px"}}/>
                        {place.numCourts}

                        {pickleball ? place["reservable_pickle"] : place["reservable_tennis"]}
                    
                    {place.restrooms && 
                        <img 
                            src={isDark ? toiletIconWhite: toiletIconBlack} 
                            style={{ height: "20px", width: "auto", marginLeft: "25px", marginRight: "5px" }} />
                    }

                    {place.lights && 
                        <img 
                            src={(isDark ? lightsIconWhite: lightsIconBlack)} 
                            style={{ height: "20px", width: "auto", marginLeft: "15px"}} />
                    }
                </div>

                <TimeButtons allTimes={allTimes} handleClick = {handleClick} theme = {theme}/>
                
            </div>
        </div>
  );
}

export default ParkToken;
