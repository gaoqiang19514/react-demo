import React from "react";
import { connect } from "react-redux";

import "./App.css";
import { increment, decrement, fetchStarted } from "./actions";

function App({ count, onIncrement, onDecrement, onFetchStared }) {
  return (
    <div className="App">
      <h1>count: {count}</h1>
      <div>
        <button type="button" onClick={onIncrement}>
          increment
        </button>
        <button type="button" onClick={onDecrement}>
          decrement
        </button>
        <button type="button" onClick={onFetchStared}>
          fetchStarted
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { count: state.count };
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => {
      dispatch(increment());
    },
    onDecrement: () => {
      dispatch(decrement());
    },
    onFetchStared: () => {
      dispatch(fetchStarted());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
