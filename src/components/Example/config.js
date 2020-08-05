const barWidth = 24;

const primaryColor = {
  type: "linear",
  x: 0,
  x2: 1,
  y: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#20A571",
    },
    {
      offset: 0.5,
      color: "#20A571",
    },
    {
      offset: 0.5,
      color: "#2AD08F",
    },
    {
      offset: 1,
      color: "#2AD08F",
    },
  ],
  topColor: "#34FBAD",
};

const secondaryColor = {
  type: "linear",
  x: 0,
  x2: 1,
  y: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#00ADC6",
    },
    {
      offset: 0.5,
      color: "#00ADC6",
    },
    {
      offset: 0.5,
      color: "#06C7E3",
    },
    {
      offset: 1,
      color: "#06C7E3",
    },
  ],
  topColor: "#00DEFF",
};

export function getChartOption() {
  const data = [
    {
      value: 21,
      itemStyle: {
        color: primaryColor,
      },
    },
    {
      value: 98,
      itemStyle: {
        color: secondaryColor,
      },
    },
  ];
  return {
    grid: {
      top: 20,
      left: 0,
      right: 0,
      bottom: 10,
    },
    xAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      data: ["Sun", "Mon"],
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        z: 1,
        type: "bar",
        barWidth: barWidth,
        label: {
          show: false,
        },
        data: data,
      },
      {
        z: 2,
        name: "底部",
        type: "pictorialBar",
        data: [
          {
            value: 1,
            itemStyle: {
              color: primaryColor,
            },
          },
          {
            value: 1,
            itemStyle: {
              color: secondaryColor,
            },
          },
        ],
        symbol: "diamond",
        symbolOffset: [0, "50%"],
        symbolSize: [barWidth, 10],
      },
      {
        z: 3,
        name: "上部",
        type: "pictorialBar",
        symbolPosition: "end",
        data: [
          {
            value: 21,
            label: {
              show: true,
              color: primaryColor.topColor,
              position: "top",
            },
            itemStyle: {
              borderColor: primaryColor.topColor,
              borderWidth: 2,
              color: primaryColor.topColor,
            },
          },
          {
            value: 98,
            label: {
              show: true,
              color: secondaryColor.topColor,
              position: "insideTop",
              distance: -15,
            },
            itemStyle: {
              borderColor: secondaryColor.topColor,
              borderWidth: 2,
              color: secondaryColor.topColor,
            },
          },
        ],
        symbol: "diamond",
        symbolOffset: [0, "-50%"],
        symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
      },
    ],
  };
}
