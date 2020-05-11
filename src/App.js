import React, { Component } from "react";
import PropTypes from "prop-types";
import echarts from "echarts";
import "echarts-wordcloud";

import "./App.css";

function getColor(index) {
  const colors = [
    "#4293F4",
    "#30DFBA ",
    "#FFDB40",
    "#FFA64F",
    "#FF4B6D",
    "#D1368C",
    "#A179FF",
  ];

  return colors[index % colors.length];
}
export default class App extends Component {
  componentDidMount() {
    const chart = echarts.init(this.ref);

    const data = [
      { value: 5581, name: "多多" },
      { value: 5019, name: "豆豆" },
      { value: 3371, name: "Lucky" },
      { value: 3280, name: "小白" },
      { value: 3255, name: "嘟嘟" },
      { value: 3011, name: "妞妞" },
      { value: 2999, name: "乐乐" },
      { value: 2634, name: "旺旺" },
      { value: 2622, name: "可乐" },
      { value: 2537, name: "球球" },
    ];

    data.map((item) => ({ ...item, value: Math.sqrt(item.value) }));

    const option = {
      series: [
        {
          type: "wordCloud",
          sizeRange: [30, 80],
          gridSize: 20,
          rotationRange: [0, 45],
          shape: "pentagon",
          textStyle: {
            normal: {
              color: ({ dataIndex }) => {
                console.log(1);
                return getColor(dataIndex);
              },
            },
          },
          data: data.sort((a, b) => {
            console.log(1);
            return b.value - a.value;
          }),
        },
      ],
    };

    chart.setOption(option);
  }

  render() {
    return (
      <div
        className="main"
        ref={(ref) => {
          this.ref = ref;
        }}
      ></div>
    );
  }
}
