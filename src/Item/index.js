import React from "react";

import "./styles.css";

function Item(props) {
  const classes = `wrap ${props.active ? "active" : ""}`;
  return (
    <div className={classes}>
      <div className="item">{props.children}</div>
    </div>
  );
}

Item.propTypes = {};

export default Item;
