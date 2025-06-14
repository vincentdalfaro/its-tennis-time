// CustomValueContainer.js
import { components } from 'react-select';

const CustomValueContainer = ({ children, ...props }) => {
  const selected = props.getValue();
  const selectedLabels = selected.map(option => option.label).join(', ');

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
          }}
        >
          {selectedLabels}
        </div>
      ) : (
        children
      )}
    </components.ValueContainer>
  );
};

export default CustomValueContainer;
