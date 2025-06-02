import * as React from 'react';

const camelPattern = /(^|[A-Z])[a-z]*/g;
function formatSettingName(name) {
  return name.match(camelPattern).join(' ');
}

function Checkbox({name, value, onChange}) {
  return (
    <div className="input">
      <label>{formatSettingName(name)}</label>
      <input type="checkbox" checked={value} onChange={evt => onChange(name, evt.target.checked)} />
    </div>
  );
}

function NumericInput({name, value, onChange}) {
  return (
    <div className="input">
      <label>{formatSettingName(name)}</label>
      <input
        type="number"
        value={value}
        onChange={evt => onChange(name, Number(evt.target.value))}
      />
    </div>
  );
}

function ControlPanel(props) {
  const {settings, onChange} = props;

  const renderSetting = (name, value) => {
    switch (typeof value) {
      case 'boolean':
        return <Checkbox key={name} name={name} value={value} onChange={onChange} />
      case 'number':
        return <div>
      {/* <p>Synchronize two maps.</p> */}

      <div style = {{marginTop: '20px'}}>
        <label>Time: </label>
        <select value={props.mode} onChange={onChange}>
          <option value="side-by-side">Side by side</option>
          <option value="split-screen">Split screen</option>
        </select>
      </div>
            </div>
      default:
        return null;
    }
  };

  return (
    <div className="control-panel">
      <h3>Settings</h3>
      <p>Turn interactive features off/on.</p>
      <hr />

      {Object.keys(settings).map(name => renderSetting(name, settings[name]))}

      <hr />
    </div>
  );
}

export default React.memo(ControlPanel);