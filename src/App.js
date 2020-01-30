import React, { useState } from "react";

function App() {
  const [num, change] = useState(0);
  const [show, changeShow] = useState(false);

  return (
    <div className="App">
      <h1>{num}</h1>
      {show && <div>hello</div>}

      <button onClick={() => change(num + 1)}>Click me</button>
      <button onClick={() => changeShow(!show)}>change show</button>
    </div>
  );
}

export default App;
