import React from "react";

import Example from "./Example";
import WithoutMemo from "./components/WithoutMemo";
import UseMemoExample from "./components/UseMemoExample";

function App() {
  return (
    <div className="App">
      <UseMemoExample />
    </div>
  );
}

export default App;
