import React from "react";

function process(values) {
  if (!(values instanceof Array)) {
    throw new Error("process(): Argument must be an array.");
  }

  values.sort();

  for (var i = 0, len = values.length; i < len; i++) {
    if (values[i] > 100) {
      return values[i];
    }
  }

  return -1;
}

function traverse(items) {
  for (let i = 0, len = items.length; i < len; i++) {
    try {
      items[i].reverse(i);
    } catch (err) {
      console.log("捕获了错误");
    }
  }
}

function App() {
  return <div>App</div>;
}

export default App;
