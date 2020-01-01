import React from "react";

import "./App.css";

import List from "./List";

function App() {
  const data = [1, 2, 3];

  return (
    <div className="App">
      <List data={data} />
    </div>
  );
}

export default App;
