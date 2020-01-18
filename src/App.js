import React, { Component } from "react";

import "./App.css";
import Layer from "./Layer";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      showLayer: false
    };
  }

  handleClick() {
    this.setState({ showLayer: !this.state.showLayer });
  }

  render() {
    const { showLayer } = this.state;

    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          show layer
        </button>

        <Layer show={showLayer} onClose={this.handleClick} />
      </div>
    );
  }
}

export default App;
