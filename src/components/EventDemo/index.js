import React from "react";
import ReactEcharts from "echarts-for-react";

const echartBoxStyle = {
  width: 300,
  height: 200,
  border: "1px solid #ccc",
};

function getOption(data) {
  /**
   * 获取数据项文本色
   * @param {Boolean} checked
   * @return {Object}
   */
  function getAxisStyle(checked) {
    if (checked) {
      return {
        textStyle: {
          fontWeight: "bold",
        },
      };
    }
  }

  /**
   * 获取数据项背景色
   * @param {Boolean} checked
   * @return {Object}
   */
  function getSeriesStyle(checked, color) {
    if (checked) {
      return {
        itemStyle: {
          color,
        },
      };
    }
    return {
      itemStyle: {
        opacity: 0.3,
      },
    };
  }

  const xAxisData = data.map((item) => ({
    value: item.name,
    ...getAxisStyle(item.checked),
  }));

  const seriesData = data.map((item) => ({
    name: item.name,
    value: item.value,
    ...getSeriesStyle(item.checked, "#F9D000"),
  }));

  const seriesData2 = data.map((item) => ({
    name: item.name,
    value: item.value2,
    ...getSeriesStyle(item.checked, "#00DEFF"),
  }));

  return {
    color: ["#F9D000", "#00DEFF"],
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      confine: true,
    },
    series: [
      {
        data: seriesData,
        type: "bar",
        stack: "bar",
      },
      {
        data: seriesData2,
        type: "bar",
        stack: "bar",
      },
    ],
  };
}

class EventDemo extends React.Component {
  state = {
    data: [
      { name: "南山", value: 120, value2: 120, checked: true },
      { name: "罗湖", value: 200, value2: 200, checked: true },
      { name: "龙岗", value: 150, value2: 150, checked: true },
      { name: "福田", value: 80, value2: 80, checked: true },
      { name: "宝安", value: 70, value2: 70, checked: true },
      { name: "龙华", value: 110, value2: 110, checked: true },
      { name: "光明", value: 130, value2: 130, checked: true },
    ],
  };

  handleClick = (event) => {
    let newestData = null;
    const { name } = event;
    const { data } = this.state;

    const res = data.filter((item) => item.checked);

    if (res.length === 1 && res[0].name === name) {
      newestData = data.map((item) => ({
        ...item,
        checked: true,
      }));
    } else {
      newestData = data.map((item) => ({
        ...item,
        checked: item.name === name,
      }));
    }

    this.setState({ data: newestData });
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        <ReactEcharts
          style={echartBoxStyle}
          option={getOption(data)}
          onEvents={{
            click: this.handleClick,
          }}
        />
      </div>
    );
  }
}

export default EventDemo;
