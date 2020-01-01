/**
 * 创建echarts自动播放tooltip数据
 * @param {Number} seriesIndex  echarts.series索引
 * @param {Number} dataLen      需要生成的数据长度
 */
function createEchartsDispatchActionData(seriesIndex = 0, dataLen = 0) {
  const result = [];

  for (let i = 0; i < dataLen; i++) {
    result.push({
      seriesIndex,
      dataIndex: i
    });
  }
  return result;
}

export default {
  createEchartsDispatchActionData
};
