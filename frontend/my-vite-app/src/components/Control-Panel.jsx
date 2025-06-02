import React, { useState, useCallback } from 'react';

// Your reusable input components
function Checkbox({ name, value, onChange, label }) {
  return (
      <div className="flex-container-map">
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

function NumericInput({ name, value, onChange, label }) {
  return (
    <div className="flex-container-map">
      <input
        type="number"
        value={value}
        onChange={e => onChange(name, Number(e.target.value))}
        id={name}
      />
      {/* <label htmlFor={name}>{label}</label> */}
    </div>
  );
}

function OptionInput({ name, value, onChange, options, label }) {
  return (
    <div className="flex-container-map">
      <label htmlFor={name}>{label}</label>
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

const initialSettings = {
  checkbox1: {
    component: Checkbox,
    label: 'Pickleball',
    value: false,
  },
  // numeric1: {
  //   component: NumericInput,
  //   label: 'Number of items',
  //   value: 5,
  // },
  option1: {
    component: OptionInput,
    label: 'Time',
    value: 'morning',
    options: ['morning', 'afternoon', 'night'],
  },
};

export default function ControlPanel() {
  const [settings, setSettings] = useState(initialSettings);

  // Update function updates value inside each setting object
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
    <div>
      <h3>Settings</h3>
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