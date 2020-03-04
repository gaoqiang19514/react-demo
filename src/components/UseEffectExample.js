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

// useEffect是 componentDidMount, componentDidUpdate, 和 componentWillUnmount三个生命周期钩子的组合
// - useEffect依赖用空数组就是componentDidMount
// - useEffect返回函数就是componentWillUnmount
// - useEffect加依赖就是componentDidUpdate
function UseEffectExample() {
  const [count, setCount] = useState(0);

  // 跟在componentDidUpdate判断state变化后更新是一样的
  useEffect(() => {
    updateTitle(count);
  }, [count]);

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}></button>
    </div>
  );
}

export function UseEffectExample2(props) {
  useEffect(() => {
    console.log("update prpos.count");
  }, [props.count]);

  return (
    <div>
      <h1>count: {props.count}</h1>
      <button onClick={props.handleUpdateCountClick} type="button">
        UseEffectExample2 update props.count
      </button>
    </div>
  );
}

export default UseEffectExample;
