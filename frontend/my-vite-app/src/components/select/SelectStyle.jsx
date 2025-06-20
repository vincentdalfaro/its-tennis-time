export default function SelectStyle(width, hide = false) {
  return {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'white' : 'transparent',
      color: state.isFocused ? 'black' : 'white',
      border: '2px solid white',
      boxShadow: 'none',
      outline: 'none',
      width: width,        
      height: 35,
      fontFamily: "Futura",
      borderRadius: 0,
      display: hide ? 'none' : 'flex',
      '&:hover': {
        boxShadow: 'none',
      },
      '& input': {
        caretColor: 'transparent',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      border: '2px solid white',
      width: 100,
      borderRadius: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? 'black'
        : state.isFocused
        ? '#636363'
        : 'white',
      color: state.isSelected
      ? 'white' 
      : state.isFocused
      ? 'black'    // <-- text color on hover
      : 'black',
      fontSize: 15,
      fontFamily: "Futura",
      padding: '12px 15px',
      ':active': {
        backgroundColor: state.isSelected ? 'black' : '#636363',
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isFocused ? 'black' : 'white',
      fontSize: 15,
    }),
    multiValue: (provided) => ({
      ...provided,
      color: 'white',
      cursor: 'pointer',
      fontFamily: 'Futura',
      fontSize: '16px',
    }),

    valueContainer: (provided) => ({
      ...provided,
      padding: '0 6px',
    }),
  };
}
