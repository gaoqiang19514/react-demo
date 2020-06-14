import React from "react";
import uuid from "uuid";

const API = {
  getData: (key) => {
    return new Promise((resolve) => {
      console.log("request", key);

      setTimeout(() => {
        resolve({ name: "tom" });
      }, 1000);
    });
  },
};

function App() {
  const [data, setData] = React.useState({});
  const [list, setList] = React.useState([
    { key: "car", checked: true },
    { key: "camera", checked: true },
  ]);

  const loadDataByKey = async (key) => {
    const res = await API.getData(key);
    setData(res);
  };

  React.useEffect(() => {
    list.forEach((item) => {
      // TODO: 怎么避免checked没有更新的项目发起请求呢？
      if (item.checked) {
        loadDataByKey(item.key);
      }
    });
  }, [list]);

  const handleChange = (key) => {
    const nextList = list.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return {
        ...item,
      };
    });

    setList(nextList);
  };

  return (
    <div className="App">
      {list.map((item) => (
        <div key={item.key}>
          <span>{item.key}</span>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleChange(item.key)}
          />
        </div>
      ))}
      <div>data: {JSON.stringify(data)}</div>
    </div>
  );
}

export default App;
