import React, { useState, useEffect } from "react";

function Dropdown() {
  const [items, setItems] = useState([{ label: "Loading ...", value: "" }]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("R2-D2");

  useEffect(() => {
    let isUnmount = false;

    async function getCharacters() {
      try {
        const response = await fetch("https://swapi.co/api/people");
        const body = await response.json();

        if (isUnmount) {
          return;
        }

        setItems(
          body.results.map(({ name }) => ({ label: name, value: name }))
        );
        setLoading(false);
      } catch (err) {
        setItems([{ label: "load error", value: "" }]);
        setLoading(false);
      }
    }

    getCharacters();

    return function() {
      isUnmount = true;
    };
  }, []);

  return (
    <select
      value={value}
      disabled={loading}
      onChange={e => setValue(e.currentTarget.value)}
    >
      {items.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
