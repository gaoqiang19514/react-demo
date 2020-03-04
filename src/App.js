import React, { useState, useEffect } from "react";

import Example from "./components/Example";
import WithoutMemo from "./components/WithoutMemo";
import UseMemoExample from "./components/UseMemoExample";

function Demo(props) {
  console.log("props", props);
  const [data, setData] = useState([...props.data]);

  const handleClick = () => {
    data.pop();
    setData([...data]);
  };

  useEffect(() => {
    setData([...props.data]);
  }, [props.data]);

  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={handleClick}>remove</button>
    </div>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

	this.handleResetClick = this.handleResetClick.bind(this);
	this.handleAddClick = this.handleAddClick.bind(this)

    this.state = {
      data: [1, 2, 3]
    };
  }

  handleResetClick() {
    this.setState({ data: [] });
  }

  handleAddClick() {
    this.setState({ data: [1, 2, 3, 4, 5, 6] });
  }

  render() {
    return (
      <div className="App">
        <Demo data={this.state.data} />
        <button onClick={this.handleResetClick}>reset</button>
        <button onClick={this.handleAddClick}>add</button>
        {/* <UseMemoExample /> */}
      </div>
    );
  }
}
