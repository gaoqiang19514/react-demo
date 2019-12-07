import React from "react";
import { connect } from "react-redux";
import "./App.css";

function App() {
  return <div className="App">App</div>;
}

const mapStateToProps = state => {
  console.log(state)
  return {};
};
export default connect(mapStateToProps)(App);
