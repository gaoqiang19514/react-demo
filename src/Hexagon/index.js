import React from "react";
import PropTypes from "prop-types";

import "./styles.less";

const propTypes = {};

function Hexagon() {
  return (
    <div className="hexagon">
      <div className="hexagon-left">
        <div className="hexagon-left-sub" />
      </div>
      <div className="hexagon-right">
        <div className="hexagon-right-sub" />
      </div>
    </div>
  );
}
Hexagon.propTypes = propTypes;

export default Hexagon;
