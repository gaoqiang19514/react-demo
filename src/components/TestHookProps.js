import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const propTypes = {
  title: PropTypes.string
};

function TestHookProps(props) {
  const [stateNum, setStateNum] = useState(0);

  let num = 0;

  useEffect(() => {
    setStateNum(stateNum + 1);
    num++;

    console.log(`useEffect:\nstateNum:${stateNum} num: ${num}`);
  }, [props.title]);

  console.log(`render:\nstateNum:${stateNum} num: ${num}`);

  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
}

TestHookProps.propTypes = propTypes;

export default TestHookProps;
