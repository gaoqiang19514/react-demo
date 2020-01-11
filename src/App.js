import React from "react";

import User from "./User";
import userHOC from "./userHOC";

const UserWrapper = userHOC(User);

function App() {
  return (
    <div className="App">
      <UserWrapper />
    </div>
  );
}

export default App;
