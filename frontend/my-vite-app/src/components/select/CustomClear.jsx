import { components } from 'react-select';

const CustomClearIndicator = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <span className='clear-button' style = {{right: "40px"}}>
        &#x2715;
      </span>
    </components.ClearIndicator>
  );
};

export default CustomClearIndicator;
