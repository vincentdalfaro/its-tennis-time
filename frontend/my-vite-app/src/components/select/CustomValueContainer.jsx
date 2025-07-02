import { components } from 'react-select';

const CustomValueContainer = ({ children, ...props }) => {
  const selected = props.getValue();
  const selectedLabels = selected.map(option => option.label).join(', ');

  const [values, input] = children;
  const isOpen = props.selectProps.menuIsOpen;

  return (
    <components.ValueContainer
      {...props}
      className={isOpen ? 'select-color-open' : 'select-color-close'}
      style={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        minWidth: 0,
        paddingLeft: 6,
      }}
    >
      {selected.length > 0 ? (
        <div
          className="custom-value-style"
          title={selectedLabels}
        >
          {selectedLabels}
        </div>
      ) : (
        values // this renders placeholder
      )}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        {input}
      </div>
    </components.ValueContainer>
  );
};

export default CustomValueContainer;
