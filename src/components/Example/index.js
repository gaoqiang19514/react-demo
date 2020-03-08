import React, { Component } from "react";

import "./style.css";

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.handleKeydown = this.handleKeydown.bind(this);

    this.state = {
      currIndex: -1,
      list: [
        {
          id: 1,
          text: "1"
        },
        {
          id: 2,
          text: "2"
        },
        {
          id: 3,
          text: "3"
        }
      ]
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {}

  handleKeydown(e) {
    let nextIndex = -1;
    const { key } = e;
    const { currIndex } = this.state;

    // 阻止掉其他按键
    if (!["ArrowDown", "ArrowUp"].includes(key)) {
      return;
    }

    if (key === "ArrowDown") {
      nextIndex = currIndex + 1;
    }

    if (key === "ArrowUp") {
      nextIndex = currIndex - 1;
    }

    nextIndex = this.resetIndex(nextIndex);

    this.setState({ currIndex: nextIndex });
  }

  resetIndex(nextIndex) {
    const len = this.state.list.length;

    if (nextIndex > len - 1) {
      // 返回-1的目的是为了给切换到输入框提供index
      // 否则一直在list上游走 给不到输入框选中机会
      return -1;
    }

    if (nextIndex < -1) {
      return len - 1;
    }

    return nextIndex;
  }

  render() {
    const { currIndex, list } = this.state;

    return (
      <ul>
        {list.map((item, index) => {
          return (
            <li key={item.id} className={currIndex === index ? "active" : ""}>
              {item.text}
            </li>
          );
        })}
      </ul>
    );
  }
}
