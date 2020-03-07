import React from "react";

import TreeExample from "./components/TreeExample";
import ListViewExample from "./components/ListViewExample";
import TableExample from "./components/TableExample";
import FormExample from "./components/FormExample";

function App() {
  return (
    <div>
      <h2>FormExample</h2>
      <FormExample />

      <h2>TableExample</h2>
      <TableExample />

      <h2>ListViewExample</h2>
      <ListViewExample />

      <h2>TreeExample</h2>
      <TreeExample />
    </div>
  );
}

export default App;
