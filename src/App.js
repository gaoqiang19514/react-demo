import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

import { getColumnDiagramOption } from "./config";
import EventDemo from "./components/EventDemo";
import NativeEcharts from "./components/NativeEcharts";

const echartBoxStyle = {
  width: 300,
  height: 200,
  border: "1px solid #ccc",
};

function getMaxFromArray(arr) {
  return Math.max.apply(null, arr);
}

class Demo extends Component {
  render() {
    const data = [
      {
        institution: 3720,
        staff: 1,
      },
      {
        institution: 800,
        staff: 1,
      },
    ];

    // 找出数据序列的最大值
    const arr = [];
    data.forEach((item) => {
      arr.push(item.institution);
      arr.push(item.staff);
    });

    const max = getMaxFromArray(arr);

    return (
      <div>
        {data.map((item, index) => (
          <ReactEcharts
            key={index}
            style={echartBoxStyle}
            option={getColumnDiagramOption(
              { institution: item.institution, staff: item.staff },
              max
            )}
          />
        ))}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <NativeEcharts />
      <Demo />
      <EventDemo />
    </div>
  );
}

export default App;
