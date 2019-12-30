import React, { Component } from "react";

export default class AutoPlayTab extends Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      tabIndex: 0,
      tabList: [0, 1, 2]
    };
  }

  componentDidMount() {
    this.play();
  }

  handleMouseEnter() {
    clearTimeout(this.timer);
  }

  handleMouseLeave() {
    this.play();
  }

  play() {
    if (this.state.tabIndex >= this.state.tabList.length) {
      this.reset();
    }

    this.timer = setTimeout(() => {
      this.doSomething();
      this.setState({ tabIndex: this.state.tabIndex + 1 }, this.play);
    }, 1000);
  }

  doSomething() {
    console.log("doSomething");
  }

  reset() {
    this.setState({ tabIndex: 0 });
  }

  render() {
    const { tabIndex, tabList } = this.state;

    return (
      <ul>
        {tabList.map(item => {
          return (
            <li
              key={item}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              className={tabIndex === item ? "active" : ""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    );
  }
}
