import React, { useState, useCallback } from "react";

/*
  Used for checkboxes in the control panel for a map

  @param {string} name - the component to choose
  @param {boolean} value - the value (true or false) of the checkbox
  @param {string} label - the displayed text
*/
function Checkbox({ name, value, onChange, label }) {
  function handleClick() {
    onChange(name, !value);
  }

  return (
    <div>
      <button
        className={`map-button ${value ? 'clicked' : ''}`}
        onClick={handleClick}
      > 
        {label}
      </button>
    </div>
  );
}

function getNext7Days() {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    days.push(`${month}-${day}`);
  }

  return days;
}

/*
  Used for checkboxes in the control panel for a map

  @param {string} name - the component to choose
  @param {boolean} value - the value (true or false) of the checkbox
  @param {list} options - a list of the given options
  @param {string} label - the displayed text on the input box
*/
function OptionInput({ name, value, onChange, options, label }) {
  return (
    <div>
      <select 
        className="custom-select"
        value={value}
        onChange={e => onChange(name, e.target.value)}
        id={name}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextInput({ value }) {
  return (
    <div>
      <span>{value}</span>
    </div>
  );
}

/*
  Used for the control panel for the map to show different customizables
*/
const initialSettings = {
  pickleball: {
    component: Checkbox,
    label: 'Pickleball',
    value: false,
  },

  times: {
    component: OptionInput,
    label: '',
    value: false,
    options: ['Morning', 'Afternoon', 'Night'],
  },

  days:{
    component: OptionInput,
    label: '',
    value: false,
    options: getNext7Days()
  },

   text: {
    component: TextInput,
    label: 'text',
    value: "to",
  },

  days2:{
    component: OptionInput,
    label: 'day-2',
    value: "to",
    options: getNext7Days()
  },
};

export default function TopBar() {
    const [settings, setSettings] = useState(initialSettings);

    /*
        A function to set the proper settings given initialSettings
    
        @param {string} name - the name of the setting given in initializeSettings
        @param {param} newValue - a value to set that setting to
      */
      const updateSettings = useCallback((name, newValue) => {
        setSettings(s => ({
          ...s,
          [name]: {
            ...s[name],
            value: newValue,
          },
        }));
      }, []);


    return (
  <div className="flex-container-map">
    {Object.entries(settings).map(([key, setting], index, arr) => {
      const Component = setting.component;
      return (
        <div key={key} style={{ marginBottom: 16 }}>
          <Component
            name={key}
            value={setting.value}
            onChange={updateSettings}
            label={setting.label}
            options={setting.options}
          />
        </div>
      );
    })}
  </div>
);

}