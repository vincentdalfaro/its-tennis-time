import * as React from 'react';
import mini_logo from '../assets/mini_logo.png'

/*
  Pin used for the map, set to an image of a tennis ball
*/
const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

function Pin({size = 15}) {
  return (
    <div>
      <img
        src={mini_logo}
        alt="Pin"
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          cursor: 'pointer',
          ...pinStyle,
        }}
      />
    </div>
    
  );
}

export default React.memo(Pin);