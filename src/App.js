import React, { useState, useEffect } from "react";

import Example from "./components/Example";
import WithoutMemo from "./components/WithoutMemo";
import UseMemoExample from "./components/UseMemoExample";
import { UseEffectExample2 } from "./components/UseEffectExample";

function Demo(props) {
  const [dataBackup, setDataBackup] = useState(props.data);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);

  const loadMore = () => {
    const temp = dataBackup.pop();
    if (temp) {
      setDataBackup(dataBackup);
      setData([...data, temp]);
    }
  };

  useEffect(() => {
    loadMore();
  }, [dataBackup]);

  useEffect(() => {
    if (flag) {
      console.log("useEffect", props.data);
      setData([]);
      setDataBackup(props.data);
    }
    setFlag(true);
  }, [props.data]);
  console.log("data", data);

  return (
    <div>
      <ul>
        {data.map(item => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      {!!dataBackup.length && <button onClick={loadMore}>loadMore</button>}
    </div>
  );
}

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
        <Demo data={this.state.data} />
        <button onClick={this.handleResetClick}>reset</button>
        <button onClick={this.handleAddClick}>add</button>
        {/* <UseMemoExample /> */}
        {/* <UseEffectExample2
          count={this.state.count}
          handleUpdateCountClick={this.handleUpdateCountClick}
        /> */}
      </div>
    );
  }
}
