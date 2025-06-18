import { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

function AutocompleteSearch({ setAddress, width, placeholder, address, confirmAddress }) {
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      setAddress(place.formatted_address);
      confirmAddress(place.formatted_address);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      confirmAddress(address);
    }
  };

  const handleBlur = () => {
    confirmAddress(address);
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
        placeholder={placeholder}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </Autocomplete>
  );
}

export default AutocompleteSearch;
