import { components } from 'react-select';

const CustomValueContainer = ({ children, ...props }) => {
  const selected = props.getValue();
  const selectedLabels = selected.map(option => option.label).join(', ');

  const [values, input] = children;
  const isOpen = props.selectProps.menuIsOpen;

  return (
    <components.ValueContainer
      {...props}
      style={{
        position: 'relative',
        paddingLeft: 6,
        display: 'flex',         
        alignItems: 'center',     
        overflow: 'hidden',
      }}
      className={isOpen ? 'select-color-open': 'select-color-close'}
    >
      {selected.length > 0 ? (
        <div
          className = "custom-value-style"
        >
          {selectedLabels}
        </div>
      ) : (
        values
      )}
      {input}
    </components.ValueContainer>
  );
};

export default CustomValueContainer;
