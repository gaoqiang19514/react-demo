import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// 无法中断循环
[1, 2, 3].forEach(item => {});

// 无法中断循环
[(1, 2, 3)].map(item => {
  return item;
});

// 无法中断循环
[(1, 2, 3)].filter(() => {
  return true;
});

// 可以被中断的循环，return直接结束循环和函数
function stopTraverse() {
  for (let i = 0; i < 10; i++) {
	console.log(i);
	// 这里直接结束了循环并且结束函数
    return true;
  }
}
stopTraverse();
