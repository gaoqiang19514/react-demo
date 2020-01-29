import React from "react";
import { connect } from "react-redux";

import "./App.css";

function App(props) {
  return (
    <div className="App">
      <h1>{props.count}</h1>
      <button onClick={() => props.onIncrement()}>onIncrement</button>
      <button onClick={() => props.onAsyncIncrement()}>onAsyncIncrement</button>
    </div>
  );
}

const mapState = state => {
  return {
    ...state.manage
  };
};

const mapDispatch = dispatch => {
  return {
    onIncrement() {
      dispatch.manage.increment();
    },
    onAsyncIncrement() {
      dispatch.manage.asyncIncrement();
    }
  };
};

export default connect(mapState, mapDispatch)(App);
