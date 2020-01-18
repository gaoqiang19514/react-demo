import React, { Component } from "react";

import Example from "./Example";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: "tom"
    };
  }

  handleClick() {
    const { name } = this.state;

    const temp = name === "tom" ? "lina" : "tom";

    this.setState({ name: temp });
  }

  render() {
    const { name } = this.state;

    return (
      <div>
        <Example name={name} />
        <button type="button" onClick={this.handleClick}>
          toggle
        </button>
      </div>
    );
  }
}

export default App;
