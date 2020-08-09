import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  mouse: PropTypes.object,
};

function Cat({ name }) {
  return <li>{name}</li>;
}

Cat.propTypes = propTypes;

export default Cat;
