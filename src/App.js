import React from "react";

import { With } from "./CommonContext";

function Demo(props) {
  console.log(props);
  return <div>Demo</div>;
}

function Demo2(props) {
  console.log(props);
  return <div>Demo2</div>;
}

const WithDemo = With(Demo);
const WithDemo2 = With(Demo2);

function App() {
  return (
    <div className="App">
      <WithDemo age={30} />
      <WithDemo2 age={31} />
    </div>
  );
}

export default App;
