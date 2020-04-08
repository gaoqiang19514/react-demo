import React, { Component } from "react";

export default class App extends Component {
  state = {
    activeKey: "heatMap",
    list: [
      { key: "heatMap", name: "热力图" },
      { key: "marker", name: "点位图" },
      { key: "airline", name: "航线图" },
    ],
  };

  onChange = (key) => {
    this.setState({ activeKey: key });
  };

  render() {
    return (
      <div>
        {this.state.list.map(({ key, name }) => (
          <label key={key}>
            <input
              type="radio"
              checked={this.state.activeKey === key}
              onChange={() => this.onChange(key)}
            />
            <span>{name}</span>
          </label>
        ))}
      </div>
    );
  }
}
