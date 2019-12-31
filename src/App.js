import React, { Component } from "react";

import "./App.css";

import AutoPlayTab from "./AutoPlayTab";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabList: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        tabList: ["0", "1", "2", "3"]
      });
    }, 3000);
  }

  render() {
    return (
      <div>
        <AutoPlayTab tabList={this.state.tabList} />
      </div>
    );
  }
}

export default App;
