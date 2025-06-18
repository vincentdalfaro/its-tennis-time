
function ParkToken({ place, index, listItemRefs }) {

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

            <div className="white-box" style = {{fontSize: "25px"}}> 
                    
            </div>
        </div>
  );
}

export default ParkToken;
