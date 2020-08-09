import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  name: PropTypes.string,
};

function Item({ name }) {
  return <li>{name}</li>;
}

Item.propTypes = propTypes;

export default Item;
