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

export function getChartOption(params) {
  // 1. 哪个数据用哪个颜色？
  // 2. 根据params来决定渲染几个柱子？

  const data = Object.keys(params).map((key) => {
    if (key === "institution") {
      return {
        value: params[key],
        itemStyle: {
          color: primaryColor,
        },
      };
    }
    return {
      value: params[key],
      itemStyle: {
        color: secondaryColor,
      },
    };
  });

  const data2 = Object.keys(params).map((key) => {
    if (key === "institution") {
      return {
        value: 1,
        itemStyle: {
          color: primaryColor,
        },
      };
    }

    return {
      value: 1,
      itemStyle: {
        color: secondaryColor,
      },
    };
  });

  const data3 = Object.keys(params).map((key) => {
    if (key === "institution") {
      return {
        value: params[key],
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
      };
    }

    return {
      value: params[key],
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
    };
  });

  return {
    grid: {
      top: 20,
      left: 0,
      right: 0,
      bottom: 10,
    },
    xAxis: {
      type: "category",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      max: 100000,
      min: 0,
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
        barWidth,
        label: {
          show: false,
        },
        data,
      },
      {
        z: 2,
        name: "底部",
        type: "pictorialBar",
        data: data2,
        symbol: "diamond",
        symbolOffset: [0, "50%"],
        symbolSize: [barWidth, 10],
      },
      {
        z: 3,
        name: "上部",
        type: "pictorialBar",
        symbolPosition: "end",
        data: data3,
        symbol: "diamond",
        symbolOffset: [0, "-50%"],
        symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
      },
    ],
  };
}
