const barWidth = 24;

const theme = {
  institution: {
    type: "linear",
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
  },
  staff: {
    type: "linear",
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
  },
};

function isRequired() {
  throw new Error("param is required");
}

export function getColumnDiagramOption(
  params = isRequired(),
  max = isRequired()
) {
  const topSeriesData = Object.keys(params).map((key) => ({
    value: params[key],
    label: {
      show: true,
      color: theme[key].topColor,
      position: "top",
    },
    itemStyle: {
      borderColor: theme[key].topColor,
      borderWidth: 2,
      color: theme[key].topColor,
    },
  }));

  const middleSeriesData = Object.keys(params).map((key) => ({
    value: params[key],
    itemStyle: {
      color: theme[key],
    },
  }));

  const bottomSeriesData = Object.keys(params).map((key) => ({
    value: 1,
    itemStyle: {
      color: theme[key],
    },
  }));

  return {
    grid: {
      top: 50,
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
      min: 0,
      max: max,
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
        z: 3,
        name: "顶部",
        type: "pictorialBar",
        symbolPosition: "end",
        symbol: "diamond",
        symbolOffset: [0, "-50%"],
        symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
        data: topSeriesData,
      },
      {
        z: 2,
        type: "bar",
        barWidth,
        label: {
          show: false,
        },
        data: middleSeriesData,
      },
      {
        z: 1,
        name: "底部",
        type: "pictorialBar",
        symbol: "diamond",
        symbolOffset: [0, "50%"],
        symbolSize: [barWidth, 10],
        data: bottomSeriesData,
      },
    ],
  };
}
