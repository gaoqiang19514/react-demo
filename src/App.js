import React, { Component } from "react";

import toast from "./Toast";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);

    this.state = {};
  }

  handleClick() {
    toast("密码错误");
  }

  handleClick2() {
    toast("账号错误");
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          toast
        </button>
        <button type="button" onClick={this.handleClick2}>
          toast2
        </button>
      </div>
    );
  }
}

export default App;
