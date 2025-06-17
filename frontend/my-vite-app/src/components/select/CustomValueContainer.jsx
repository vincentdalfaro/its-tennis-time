import { components } from 'react-select';

const CustomValueContainer = ({ children, ...props }) => {
  const selected = props.getValue();
  const selectedLabels = selected.map(option => option.label).join(', ');

  // children is usually [values (the pills), input]
  const [values, input] = children;

  return (
    <components.ValueContainer
      {...props}
      style={{ position: 'relative', paddingLeft: 6 }}
    >
      {selected.length > 0 ? (
        <div
          style={{
            fontFamily: 'Futura',
            fontSize: 15,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            position: 'absolute',
            pointerEvents: 'none', 
          }}
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
