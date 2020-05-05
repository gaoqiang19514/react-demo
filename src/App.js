import React from "react";

import Example from "./components/Example";
import WithoutMemo from "./components/WithoutMemo";
import UseMemoExample from "./components/UseMemoExample";
import UseEffectExample from "./components/UseEffectExample";
import Dropdown from "./components/Dropdown";
import TestHookProps from "./components/TestHookProps";
import Sort from "./components/Sort";

const products = [
  { id: 1, name: "A-MacBook Pro 13", price: 12.0, stock: 20 },
  { id: 2, name: "B-Xiaomi 10", price: 4.999, stock: 32 },
  {
    id: 3,
    name: "C-微软 Surface Pro 7 二合一平板电脑笔记本",
    price: 6988.0,
    stock: 12,
  },
  {
    id: 4,
    name: "D-尼康（Nikon）D3500 单反相机",
    price: 3199.0,
    stock: 9,
  },
  {
    id: 5,
    name: "E-Apple MacBook Air 13.3",
    price: 7199.0,
    stock: 99,
  },
  {
    id: 6,
    name: "F-小米Air 13.3英寸全金属超轻薄",
    price: 5969.0,
    stock: 86,
  },
  {
    id: 7,
    name: "G-华为 HUAWEI Mate 30 Pro ",
    price: 5399.0,
    stock: 12,
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleUpdateCountClick = this.handleUpdateCountClick.bind(this);

    this.state = {
      title: "",
      count: 0,
      data: [1, 2, 3],
    };
  }

  handleResetClick() {
    this.setState({ data: [] });
  }

  handleAddClick() {
    this.setState({ data: [1, 2, 3, 4, 5, 6] });
  }

  handleUpdateCountClick() {
    this.setState({ count: this.state.count + 1 });
  }

  handleChangeTitleClick = () => {
    this.setState({
      title: "TestHookProps",
    });
  };

  render() {
    return (
      <div className="App">
        {/* <TestHookProps title={this.state.title} /> */}
        {/* <button onClick={this.handleChangeTitleClick}>change title</button> */}
        {/* <Sort products={products} /> */}
		<Example />
      </div>
    );
  }
}
