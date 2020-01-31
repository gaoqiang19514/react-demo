import React, { useState, useEffect } from "react";

function Example() {
  useEffect(() => {
    console.log("useEffect");

    return () => {
      console.log("unmount effect");
    };
  }, []);

  return <div>Example</div>;
}

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      {show && <Example />}
      <button onClick={() => setShow(!show)}>Click me</button>
    </div>
  );
}

export default App;
