import React, { useState, useCallback } from "react";

/*
  Used for checkboxes in the control panel for a map

  @param {string} name - the component to choose
  @param {boolean} value - the value (true or false) of the checkbox
  @param {string} label - the displayed text
*/
function Checkbox({ name, value, onChange, label }) {
  return (
      <div className = "check-button">
        <label htmlFor={name}>{label}</label>
        <input
          type="checkbox"
          checked={value}
          onChange={e => onChange(name, e.target.checked)}
          id={name}
        />
      </div>
  );
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
    label: 'Time',
    value: '',
    options: ['morning', 'afternoon', 'night'],
  },

  days:{
    component: OptionInput,
    label: 'Day',
    value: '',
    options: ['hello', 'The next Day', 'the next day']
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
                {Object.entries(settings).map(([key, setting]) => {
                const Component = setting.component;
                
                return (
                    <Component
                        key={key}
                        name={key}
                        value={setting.value}
                        onChange={updateSettings}
                        label={setting.label}
                        options={setting.options}
                    />
                );
            })}
        </div>
    );

}