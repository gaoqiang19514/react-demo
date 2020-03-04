import React, { useState, useEffect, Component } from "react";

export class Example extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    this.updateTitle(this.state.count);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      this.updateTitle(this.state.count);
    }
  }

  updateTitle(count) {
    document.title = `You clicked ${count} times`;
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleClick}></button>
      </div>
    );
  }
}

function updateTitle(count) {
  document.title = `You clicked ${count} times`;
}

// useEffect是 componentDidMount, componentDidUpdate, componentWillUnmount三个生命周期钩子的组合
// useEffect依赖用空数组就是componentDidMount
// useEffect返回函数就是componentWillUnmount
// useEffect加依赖就是componentDidUpdate（初始化会执行，需要加逻辑处理初始化执行的问题）
function UseEffectExample(props) {
  // 用来模拟componentDidUpdate
  const [initFlag, setInitFlag] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!initFlag) {
      console.log("useEffect");
      updateTitle(count);
    }
    setInitFlag(false);
  }, [count]);

  useEffect(() => {
    if (!initFlag) {
      console.log("useEffect");
    }
    setInitFlag(false);
  }, [props.num]);

  return (
    <div>
      <h1>count: {count}</h1>
      <button type="button" onClick={() => setCount(count + 1)}>
        increment count
      </button>
    </div>
  );
}

export default UseEffectExample;
