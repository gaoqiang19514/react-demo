import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

// import Example from "./components/Example";

import { getChartOption } from "./config";

const echartBoxStyle = {
  width: 300,
  height: 200,
  border: "1px solid #ccc",
};

class Demo extends Component {
  getOption(x, y) {
    return getChartOption({ institution: x, staff: y });
    // return {
    //   tooltip: {},
    //   xAxis: {
    //     data: ["衬衫", "羊毛衫"],
    //   },
    //   yAxis: {
    //     max: 1200,
    //     min: 1,
    //   },
    //   series: [
    //     {
    //       name: "销量",
    //       type: "bar",
    //       data,
    //     },
    //   ],
    // };
  }

  render() {
    // 指定图表的配置项和数据

    return (
      <div>
        <ReactEcharts
          style={echartBoxStyle}
          option={this.getOption(90000, 1)}
        />
        <ReactEcharts
          style={echartBoxStyle}
          option={this.getOption(36, 1200)}
        />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Demo />
    </div>
  );
}

export default App;
