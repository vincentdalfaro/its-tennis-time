import { components } from 'react-select';


const CustomValueContainer = ({ children, ...props }) => {
  const selected = props.getValue();
  const selectedLabels = selected.map(option => option.label).join(', ');
  const [values, input] = children;

  return (
    <components.ValueContainer {...props}>
      {selected.length > 0 ? (
        <div
          style={{
            paddingLeft: 6,
            fontFamily: "Futura",
            fontSize: 15,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            position: 'absolute',
            pointerEvents: 'none',
          }}
        >
          {selectedLabels}
        </div>
      ) : (
        // Render placeholder here explicitly if no selection
        <div
          style={{
            paddingLeft: 6,
            fontFamily: "Futura",
            fontSize: 15,
            color: '#aaa',
          }}
        >
          {props.selectProps.placeholder}
        </div>
      )}

      {input}
    </components.ValueContainer>
  );
};


export default CustomValueContainer