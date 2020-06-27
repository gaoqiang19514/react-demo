import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  user-select: none;
`;

function SwitchControl({ typeList, onChange }) {
  return typeList.map(({ name, path, checked }) => {
    return (
      <Label key={name}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(name, path, checked)}
        />
        {name}
      </Label>
    );
  });
}

export default SwitchControl;
