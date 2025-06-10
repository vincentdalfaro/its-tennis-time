const SelectStyle = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'white' : 'transparent',
    color: state.isFocused ? 'black' : 'white',
    border: '2px solid white',
    boxShadow: 'none',
    outline: 'none',
    width: 300,
    minHeight: 20,
    fontSize: 15,
    borderRadius: 0,
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    width: 100,
    borderRadius: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#2684ff'
      : state.isFocused
      ? '#b3d4ff'
      : 'white',
    color: state.isSelected ? 'white' : 'black',
    fontSize: 15,
    padding: '12px 15px',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isFocused ? 'black' : 'white',
    fontSize: 16,
  }),
  multiValue: (provided) => ({
  ...provided,
  color: '#666',           // default "x" color (gray)
  cursor: 'pointer',
  fontSize: '16px'
})
};

export default SelectStyle;