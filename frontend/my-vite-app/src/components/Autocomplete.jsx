import { useRef, useState, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';

function AutocompleteSearch({ setAddress, width, placeholder, address }) {
  const autocompleteRef = useRef(null);
  const [inputValue, setInputValue] = useState(address || '');
  const [isFocused, setIsFocused] = useState(false);

  {/* Sync Address */}
  const syncAddress = (value) => {
    setInputValue(value);
    setAddress(value);
  };

  {/* Different Helper Functions to handle behavior */}
  useEffect(() => {
    if (!isFocused && inputValue !== address) {
      setInputValue(address || '');
    }
  }, [address, isFocused, inputValue]);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      syncAddress(place.formatted_address);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (inputValue !== address) {
      setAddress(inputValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const clearInput = () => {
    syncAddress('');
    if (autocompleteRef.current) {
      const input = autocompleteRef.current?.getInputElement?.() || null;
      if (input) input.focus();
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block'}}>
      <Autocomplete
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={handlePlaceChanged}
      >
        {/* Custom input button for address*/}
        <input
          type="text"
          className="input"
          style={{ width: width, fontFamily: 'Futura', paddingRight: '24px' }}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </Autocomplete>

      {/* Custom clear input*/}
      {inputValue && (
        <button
          onClick={clearInput}
          aria-label="Clear input"
          title="Clear"
          type="button"
          className="clear-button"
        >
          &#x2715;
        </button>
      )}
    </div>
  );
}

export default AutocompleteSearch;
