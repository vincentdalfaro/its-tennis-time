
function ParkToken({ place, index, listItemRefs }) {
  
    // console.log(place['distance']['distance_text'])

    return (
        <div>
            <div
                className = "white-text"
                style ={{fontSize: "50px", display: "flex"}}
            >
                
                {place.name} 
                
                <div style = {{fontSize: "15px"}}>
                    {place['distance']['distance_text']}
                </div>

            </div>

            <div className="white-box" style = {{fontSize: "25px"}}> 
                    
            </div>
        </div>
  );
}

export default ParkToken;
