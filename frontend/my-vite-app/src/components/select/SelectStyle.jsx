export default function SelectStyle({ width, hide = false, theme }) {  
  console.log("select")

  const isDark = theme === 'dark';
  
  console.log(theme)
  console.log(isDark)

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
      width,
      height: 35,
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
      width: 100,
      borderRadius: 0,
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? (isDark ? '#fff' : '#000')
        : state.isFocused
        ? (isDark ? '#fff' : '#f0f0f0')
        : isDark
        ? '#222'
        : '#fff',
      color: state.isSelected
        ? '#fff'
        : state.isFocused
        ? '#000'
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
