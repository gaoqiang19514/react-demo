import React from "react";
import uuid from "uuid";
import "./App.css";

/**
 * 获取数组中最大和最小值
 * @param {Array} items
 * @return {Array} [min, max]
 */
function getMinAndMax(items) {
  const min = Math.min.apply(
    null,
    items.map((item) => item.value)
  );

  const max = Math.max.apply(
    null,
    items.map((item) => item.value)
  );

  return [min, max];
}

/**
 * 获取min和max拆分len个区间值的列表
 * @param {Number} min
 * @param {Number} max
 * @param {Number} len
 * @return {Array} [[0, 10], [10, 100], [100, 1000]]
 */
function getSeparateAreaList(min, max, len) {
  const separateAreaList = [];
  const separateNum = (max - min) / len;

  for (let i = 0; i < 4; i++) {
    const start = separateNum * i + min;
    separateAreaList.push([start, start + separateNum]);
  }

  return separateAreaList;
}

/**
 * 获取value所处separateAreaList的索引值 + 1
 * @param {Number} value
 * @param {Array} separateAreaList
 * @return {Number} 1、2、3F
 */
function getClassName(value, separateAreaList) {
  let index = 0;

  for (let i = 0; i < separateAreaList.length; i++) {
    const [min, max] = separateAreaList[i];

    if (value >= min && value <= max) {
      index = i + 1;
    }
  }

  return index;
}

function App() {
  const [items] = React.useState([
    { id: uuid(), value: 10 },
    { id: uuid(), value: 10 },
    { id: uuid(), value: 515560 },
    { id: uuid(), value: 10 },
    { id: uuid(), value: 515560 },
    { id: uuid(), value: 10 },
    { id: uuid(), value: 515560 },
    { id: uuid(), value: 10 },
    { id: uuid(), value: 515560 },
    { id: uuid(), value: 1011110 },
  ]);

  const [min, max] = getMinAndMax(items);
  const separateAreaList = getSeparateAreaList(min, max, 4);

  return (
    <div className="App">
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className={`size-${getClassName(item.value, separateAreaList)}`}
          >
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// 1. 计算得到最小值和最大值
// 2. 将最大最小值分为可选的区间数
// 3. 将每个区间映射到可选的样式尺寸上
