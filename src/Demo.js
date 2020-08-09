import React from "react";

import { connect } from "./UserContext";

function Demo(props) {
  return (
    <div>
      <>
        <div>name: {props.name}</div>
        <div>age: {props.age}</div>
        <div>sex: {props.sex}</div>
      </>
    </div>
  );
}

const mapState = (state) => ({ ...state, sex: "male" });

export default connect(mapState)(Demo);
