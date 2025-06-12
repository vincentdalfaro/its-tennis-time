import React, { useRef, useState } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

function AutocompleteSearch({setAddress}) {
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place) {
      setAddress(place.formatted_address);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBZ58k9XjJoAvDqPnltyNqR13i0ZIWWKcc" libraries={libraries}>
      <div>
          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={handlePlaceChanged}
          >
             <input
                type="text"
                className="input"
                style={{width: "300px"}}
                placeholder = "Address"
            />
          </Autocomplete>
      </div>
    </LoadScript>
  );
}

export default AutocompleteSearch;