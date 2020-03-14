import React from "react";
import { produce } from "immer";

const currentState = {
  children: []
};

let nextState = produce(currentState, draft => {
  draft.children.push(1);
});

console.log(currentState, nextState);

function App() {
  return (
    <div className="App">
      <h1>immer</h1>
    </div>
  );
}

export default App;
