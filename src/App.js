import React from "react";

import { With } from "./CommonContext";

function Demo(props) {
  console.log(props);
  return <div>Demo</div>;
}

const WithDemo = With(Demo);

function App() {
  return (
    <div className="App">
      <WithDemo age={30} />
    </div>
  );
}

export default App;
