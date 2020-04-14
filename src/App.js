import React from "react";
import "./App.css";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function calc(start = 6, times = 12) {
  const radius = 200;
  const posList = [];
  let len = times;

  // 角度
  const angle = 360 / times;
  // 弧度
  const radian = (angle * Math.PI) / 180;

  while (len > 0) {
    const i = --len;
    const x = (start + i) % times;

    posList.push({
      left: Math.round(Math.sin(radian * x) * radius),
      top: Math.round(Math.cos(radian * x) * radius),
    });
  }

  return posList;
}

function App() {
  const postList = calc(6, 12);

  return (
    <div className="App">
      <div className="container">
        <div className="box">
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                style={{
                  top: postList[index].top,
                  left: postList[index].left,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
