import React from "react";
import PropTypes from "prop-types";

function List({ data }) {
  return (
    <ul>
      {data.map(item => {
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
}

List.propTypes = {
  data: PropTypes.array
};

export default List;
