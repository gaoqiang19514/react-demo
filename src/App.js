import React from "react";
import logo from "./logo.svg";
import "./App.css";

const obj = {
  foo: {
    bar: {
      baz: 42
    }
  }
};

const baz = obj?.foo?.bar?.baz ?? 'lina'; // 42

const safe = obj?.qux?.baz ?? "tom"; // undefined

console.log(baz);
console.log(safe);

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
