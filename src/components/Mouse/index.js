import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  render: PropTypes.func.isRequired,
};

function Mouse({ render }) {
  const [state, setState] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div style={{ height: "50vh" }} onMouseMove={handleMouseMove}>
      {render(state)}
    </div>
  );
}

Mouse.propTypes = propTypes;

export default Mouse;
