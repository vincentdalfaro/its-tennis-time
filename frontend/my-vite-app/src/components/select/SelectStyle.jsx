export default function SelectStyle({ width = 1000, height = 35, hide = false, theme }) {  
  const isDark = theme === 'dark';
  
  return {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? (isDark ? '#fff' : '#000')
        : (isDark ? '#000' : '#fff'),
      color: state.isFocused
        ? (isDark ? '#000' : '#fff')
        : (isDark ? '#fff' : '#000'),
      border: `2px solid ${isDark ? '#fff' : '#000'}`,
      boxShadow: 'none',
      outline: 'none',
      width,          // <-- use passed width
      height,         // <-- use passed height
      borderRadius: 0,
      display: hide ? 'none' : 'flex',
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: isDark ? '#fff' : '#000',
      },
      '& input': {
        caretColor: 'transparent',
      },
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: isDark ? '#222' : '#fff',
      border: `2px solid ${isDark ? '#fff' : '#000'}`,
      width,
      borderRadius: 0,
    }),

    placeholder: (provided) => ({
      ...provided,
      color: isDark ? '#888' : '#ccc',      
      opacity: 1,                           
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? (isDark ? '#fff' : '#000')
        : state.isFocused
        ? (isDark ? '#636363' : '#636363')
        : isDark
        ? '#000'
        : '#fff',
      color: state.isSelected
        ? (isDark ? "#000" : '#fff')
        : state.isFocused
        ? (isDark ? '#000' : '#fff')
        : isDark
        ? '#fff'
        : '#000',
      fontSize: 15,
      padding: '12px 15px',
      ':active': {
        backgroundColor: state.isSelected
          ? (isDark ? '#000' : '#ddd')
          : (isDark ? '#636363' : '#f0f0f0'),
      },
    }),
    menuList: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      marginBottom: 0,
    }),

    singleValue: (provided, state) => ({
      ...provided,
      color: isDark ? '#fff' : '#000',
      fontSize: 15,
    }),

    multiValue: (provided) => ({
      ...provided,
      color: isDark ? '#fff' : '#000',
      cursor: 'pointer',
      fontSize: '16px',
    }),

    valueContainer: (provided) => ({
      ...provided,
      padding: '0 6px',
    }),
  };
}
