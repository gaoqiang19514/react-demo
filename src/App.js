import React from "react";
import moment from "moment";
import "antd/dist/antd.css";
import { DatePicker } from "antd";

async function request(url) {
  try {
    const response = await fetch(url);
    const { code, data } = await response.json();

    if (code === 0 && data) {
      return [null, data];
    }

    return [new Error("暂无数据")];
  } catch (err) {
    return [err];
  }
}

// 传入一个props.dateString值，然后根据props.dateString的变化更新子组件

function useFetchItems(dateString) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [err, data] = await request(
        "https://www.fastmock.site/mock/ea33200ef591c041d9bc4665226bfcf7/dog/getDogCaseList"
      );

      if (!err) {
        setItems(data);
      }
      setLoading(false);
    };

    loadData();
  }, [dateString]);

  return {
    loading,
    items,
  };
}

function Example(props) {
  const { loading, items } = useFetchItems(props.dateString);

  return (
    <div>
      <div>{loading && "loading..."}</div>
      <ul>
        {items.map(({ caseId, longitude, latitude }) => (
          <li key={caseId}>
            {caseId}: {longitude}-{latitude}
          </li>
        ))}
      </ul>
    </div>
  );
}

class App extends React.Component {
  state = {
    dateString: moment().format("YYYY-MM-DD"),
  };

  handleChange = (_, dateString) => {
    const isNeedUpdate = dateString !== this.state.dateString;

    if (isNeedUpdate) {
      // console.log("Date change");
      this.setState({ dateString });
    }
  };

  render() {
    const { dateString } = this.state;

    return (
      <div className="App">
        <h1>date: {dateString}</h1>
        <DatePicker onChange={this.handleChange} />
        <Example dateString={dateString} />
      </div>
    );
  }
}

export default App;
