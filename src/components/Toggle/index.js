import React from "react";

function Toggle({ viewList, onChange }) {
  return (
    <div>
      {viewList.map((item) => (
        <div key={item.key}>
          <span>{item.key}</span>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => onChange(item.key, item.checked)}
          />
        </div>
      ))}
    </div>
  );
}

export default Toggle;
