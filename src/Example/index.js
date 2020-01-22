import React, { Component } from "react";
import { Router, Route } from "react-router-dom";

import history from "../services/history";
import Modal from "../Modal";

class Example extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    history.push("/modal");
  }

  render() {
    return (
      <Router history={history}>
        <button onClick={this.handleClick} type="button">
          open modal
        </button>
        <Route path="/modal" component={Modal} />
      </Router>
    );
  }
}

export default Example;
