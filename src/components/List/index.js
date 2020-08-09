import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  render: PropTypes.func.isRequired,
};

function List({ render }) {
  return <ul>{render()}</ul>;
}

List.propTypes = propTypes;

export default List;
