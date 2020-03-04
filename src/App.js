import React from "react";

import Example from "./components/Example";
import WithoutMemo from "./components/WithoutMemo";
import UseMemoExample from "./components/UseMemoExample";
import UseEffectExample from "./components/UseEffectExample";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleUpdateCountClick = this.handleUpdateCountClick.bind(this);

    this.state = {
      count: 0,
      data: [1, 2, 3]
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

  render() {
    return (
      <div className="App">
        <UseEffectExample num={1} />
      </div>
    );
  }
}
