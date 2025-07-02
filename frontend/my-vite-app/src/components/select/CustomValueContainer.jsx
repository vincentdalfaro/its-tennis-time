// CustomValueContainer.jsx
import { components } from 'react-select';

const CustomValueContainer = ({ children, ...props }) => {
  const selected = props.getValue();
  const isOpen = props.selectProps.menuIsOpen;

  const [values, input] = children;

  return (
    <components.ValueContainer
      {...props}
      style={{
        position: 'relative',
        paddingLeft: 6,
        display: 'flex',
        flexWrap: 'wrap',         // Allow wrapping of items
        alignItems: 'center',
        overflow: 'hidden',
        maxHeight: '6em',          // Optional: limit height to 3 lines approx
      }}
      className={isOpen ? 'select-color-open' : 'select-color-close'}
    >
      {selected.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {selected.map((option) => (
            <div
              key={option.value}
              style={{
                whiteSpace: 'normal',
                padding: '2px 6px',
                backgroundColor: '#eee',
                borderRadius: '4px',
                fontSize: 14,
                maxWidth: '100%',
                overflowWrap: 'break-word',
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      ) : (
        values
      )}

      {/* Visually hidden, but still keeps keyboard/touch logic */}
      <div style={{ display: 'none' }}>
        {values}
      </div>

      {input}
    </components.ValueContainer>
  );
};

export default CustomValueContainer;
