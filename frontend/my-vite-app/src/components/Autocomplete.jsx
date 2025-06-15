import { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

function AutocompleteSearch({ setAddress, width, placeholder}) {
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place) {
      setAddress(place.formatted_address);
    }
  };

  return (

    <Autocomplete
      onLoad={(ref) => (autocompleteRef.current = ref)}
      onPlaceChanged={handlePlaceChanged}
    >
      <input
        type="text"
        className="input"
        style={{ width: width, fontFamily: 'Futura' }}
        placeholder = {placeholder}
      />
    </Autocomplete>
  );
}

export default AutocompleteSearch;
